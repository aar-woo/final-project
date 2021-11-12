require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const ClientError = require('./client-error');
const uploadsMiddleware = require('./uploads-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(express.json());

app.post('/api/inventory/1', uploadsMiddleware, (req, res, next) => {
  const {
    articleTypeId, primaryColor, secondaryColor, colorCategoryId, secondaryColorCategoryId
  } = req.body;
  if (!articleTypeId || !primaryColor || !colorCategoryId) {
    throw new ClientError(401, 'Invalid article, articleTypeId, primaryColor, and colorCategoryId are required.');
  }

  const imgUrl = `/images/${req.file.filename}`;

  const sql = `
  insert into "articles" ("userId", "imgUrl", "articleTypeId", "primaryColor",
                          "secondaryColor", "colorCategoryId", "secondaryColorCategoryId")
              values ($1, $2, $3, $4, $5, $6, $7)
              returning *
  `;
  const params = [1, imgUrl, articleTypeId, primaryColor, secondaryColor, colorCategoryId, secondaryColorCategoryId];
  db.query(sql, params)
    .then(result => {
      const [articles] = result.rows;
      res.status(201).json(articles);
    })
    .catch(err => next(err));
});

app.delete('/api/inventory/1/:articleId', (req, res, next) => {
  const articleId = req.params.articleId;
  const sql = `
    delete from "articles"
      where "articleId" = $1
      returning *;
  `;
  const params = [articleId];
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

app.post('/api/outfits/1', (req, res, next) => {
  const { topArticleId, bottomArticleId, shoesArticleId } = req.body;
  const userId = 1;
  if (!topArticleId || !bottomArticleId || !shoesArticleId) {
    throw new ClientError(401, 'Invalid outfit, requires top, bottom, and shoes');
  }
  const sql = `
    insert into "outfits" ("topArticleId", "bottomArticleId", "shoesArticleId", "userId")
      values ($1, $2, $3, $4)
      returning *
  `;
  const params = [topArticleId, bottomArticleId, shoesArticleId, userId];
  db.query(sql, params)
    .then(result => {
      const [outfit] = result.rows;
      res.status(201).json(outfit);
    })
    .catch(err => next(err));
});

app.use(staticMiddleware);

app.get('/api/inventory/1', (req, res, next) => {
  const sql = `
  select "articleId",
         "imgUrl",
         "primaryColor",
         "secondaryColor"
    from "articles"
    where "userId" = 1
  `;
  db.query(sql)
    .then(result => {
      if (result.rows.length === 0) {
        res.json([]);
        return;
      }
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/inventory/1/:articleType', (req, res, next) => {
  const articleType = req.params.articleType;
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
        where "userId" = 1
        AND "articleTypeId" = $1
  `;
  const params = [articleTypeId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        res.json([]);
        return;
      }
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/inventory/1/:articleType/:color', (req, res, next) => {
  const articleType = req.params.articleType;
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
        where "userId" = 1
        AND "articleTypeId" = $1
        AND ("colorCategoryId" = $2 OR "secondaryColorCategoryId" = $2);
  `;
  const params = [articleTypeId, colorId];
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

app.get('/api/outfits/1', (req, res, next) => {
  const sql = `
      select "o"."outfitId",
        "a"."imgUrl",
        "a"."articleTypeId",
        "a"."primaryColor",
        "a"."secondaryColor"
    from "articles" as "a"
    join "outfits" as "o" using ("userId")
    where "o"."topArticleId" = "a"."articleId"
    OR "o"."bottomArticleId" = "a"."articleId"
    OR "o"."shoesArticleId" = "a"."articleId"
    order by "o"."outfitId"
  `;
  db.query(sql)
    .then(result => {
      if (result.rows.length === 0) {
        res.json([]);
        return;
      }
      const articlesData = result.rows;
      const outfitsArr = [];
      let currOutfit = [];
      for (let i = 0; i < articlesData.length; i++) {
        if (currOutfit.length === 3) {
          outfitsArr.push(currOutfit);
          currOutfit = [];
        }
        currOutfit.push(articlesData[i]);
      }
      res.json(outfitsArr);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
