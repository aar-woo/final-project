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
      const [article] = result.rows;
      res.status(201).json(article);
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
