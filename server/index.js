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
  const { articleTypeId, primaryColor, secondaryColor, colorCategoryId, secondaryColorCategoryId } = req.body;
  if (!articleTypeId || !primaryColor || !colorCategoryId) {
    throw new ClientError(401, 'Invalid article, must include articleTypeId, primaryColor, and colorCategoryId are required.');
  }

  const imgUrl = `/images/${req.file.filename}`;

  const insertSql = `
    insert into "articles" ("userId", "imgUrl", "articleTypeId", "primaryColor",
                            "secondaryColor", "colorCategoryId", "secondaryColorCategoryId")
                    values ($1, $2, $3, $4, $5, $6, $7)
                  returning *
  `;
  const insertParams = [1, imgUrl, articleTypeId, primaryColor, secondaryColor, colorCategoryId, secondaryColorCategoryId];
  db.query(insertSql, insertParams)
    .then(result => {
      const [article] = result.rows;
      res.status(201).json(article);
    })
    .catch(err => next(err));
});

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
