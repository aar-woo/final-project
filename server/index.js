require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const ClientError = require('./client-error');
const uploadsMiddleware = require('./uploads-middleware');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

app.use(express.json());

async function queryDatabase(sql, params, res, next) {
  try {
    const results = await db.query(sql, params);
    if (results.rows.length === 0) {
      res.json([]);
      return;
    }
    res.json(results.rows);
  } catch (err) {
    next(err);
  }
}

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
      insert into "users" ("username", "password")
        values ($1, $2)
        returning "userId", "username"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password: userPassword } = req.body;
  if (!username || !userPassword) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "password"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, password } = user;
      return argon2
        .verify(password, userPassword)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.post('/api/inventory', uploadsMiddleware, (req, res, next) => {
  const {
    articleTypeId, primaryColor, secondaryColor, colorCategoryId, secondaryColorCategoryId
  } = req.body;
  if (!articleTypeId || !primaryColor || !colorCategoryId) {
    throw new ClientError(401, 'Invalid article, articleTypeId, primaryColor, and colorCategoryId are required.');
  }
  const userId = req.user.userId;
  const imgUrl = req.file.location;
  const sql = `
    insert into "articles" ("userId", "imgUrl", "articleTypeId", "primaryColor",
                            "secondaryColor", "colorCategoryId", "secondaryColorCategoryId")
                values ($1, $2, $3, $4, $5, $6, $7)
                returning *
  `;
  const params = [userId, imgUrl, articleTypeId, primaryColor, secondaryColor, colorCategoryId, secondaryColorCategoryId];
  db.query(sql, params)
    .then(result => {
      const [articles] = result.rows;
      res.status(201).json(articles);
    })
    .catch(err => next(err));
});

app.delete('/api/inventory/:articleId', (req, res, next) => {
  const articleId = req.params.articleId;
  const userId = req.user.userId;
  const sql = `
    delete from "articles"
      where "articleId" = $1
      AND "userId" = $2
      returning *;
  `;
  const params = [articleId, userId];
  db.query(sql, params)
    .then(result => {
      const [article] = result.rows;
      if (!article) {
        throw new ClientError(404, 'Article not found.');
      }
      res.status(204).json(article);
    })
    .catch(err => next(err));
});

app.post('/api/outfits', (req, res, next) => {
  const { topArticleId, bottomArticleId, shoesArticleId } = req.body;
  const userId = req.user.userId;
  if (!topArticleId || !bottomArticleId || !shoesArticleId) {
    throw new ClientError(401, 'Invalid outfit, requires top, bottom, and shoes');
  }
  const sql = `
    insert into "outfits" ("topArticleId", "bottomArticleId", "shoesArticleId", "userId")
      values ($1, $2, $3, $4)
      returning *
  `;
  const params = [topArticleId, bottomArticleId, shoesArticleId, userId];
  queryDatabase(sql, params, res, next);
});

app.get('/api/inventory/:userId', (req, res, next) => {
  const userId = req.params.userId;
  const sql = `
    select "articleId",
          "imgUrl",
          "primaryColor",
          "secondaryColor"
      from "articles"
      where "userId" = $1
  `;
  const params = [userId];
  queryDatabase(sql, params, res, next);
});

app.get('/api/inventory/:userId/:articleType', (req, res, next) => {
  const articleType = req.params.articleType;
  const userId = req.params.userId;
  const articleTypeIds = {
    tops: 1,
    bottoms: 2,
    shoes: 3
  };
  const articleTypeId = articleTypeIds[articleType];
  const sql = `
    select "articleId",
            "imgUrl",
            "primaryColor",
            "secondaryColor"
        from "articles"
        where "userId" = $1
        AND "articleTypeId" = $2
  `;
  const params = [userId, articleTypeId];
  queryDatabase(sql, params, res, next);
});

app.get('/api/inventory/:userId/:articleType/:color', (req, res, next) => {
  const articleType = req.params.articleType;
  const userId = req.params.userId;
  const color = req.params.color;
  const articleTypeIds = {
    tops: 1,
    bottoms: 2,
    shoes: 3
  };
  const colorIds = {
    black: 1,
    white: 2,
    grey: 3,
    red: 4,
    yellow: 5,
    green: 6,
    cyan: 7,
    blue: 8,
    magenta: 9,
    khaki: 10,
    none: 0
  };
  const articleTypeId = articleTypeIds[articleType];
  const colorId = colorIds[color];
  const sql = `
    select "articleId",
        "imgUrl",
        "primaryColor",
        "secondaryColor",
        "articleTypeId"
    from "articles"
    where "userId" = $1
    AND "articleTypeId" = $2
    AND ("colorCategoryId" = $3 OR "secondaryColorCategoryId" = $3);
  `;
  const params = [userId, articleTypeId, colorId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        res.json([{
          imgUrl: `images/${articleType}Placeholder.png`,
          articleId: 0,
          articleTypeId,
          isPlaceholder: true,
          isInitialPlaceholder: false,
          primaryColor: 'white',
          secondaryColor: 'white'
        }]);
        return;
      }
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/outfits/:userId', (req, res, next) => {
  const userId = req.params.userId;
  const sql = `
      select "o"."outfitId",
        "a"."imgUrl",
        "a"."articleTypeId",
        "a"."primaryColor",
        "a"."secondaryColor"
    from "articles" as "a"
    join "outfits" as "o" using ("userId")
    where "o"."userId" = $1
    AND ("o"."topArticleId" = "a"."articleId"
    OR "o"."bottomArticleId" = "a"."articleId"
    OR "o"."shoesArticleId" = "a"."articleId")
    order by "o"."outfitId"
  `;
  const params = [userId];
  queryDatabase(sql, params, res, next);
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
