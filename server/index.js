require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const ClientError = require('./client-error');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(express.json());

app.post('/api/inventory/1', function (req, res, next) {
  const { userId, imgUrl, articleTypeId, primaryColor, secondaryColor, colorCategoryId, secondaryColorCategoryId } = req.body;
  if (!userId || !imgUrl || !articleTypeId || !primaryColor || !colorCategoryId) {
    throw new ClientError(401, 'Invalid article, must include userId, imgUrl, articleTypeId, primaryColor, and colorCategoryId are requried.');
  }

  // const sql = `
  //   select "username"
  //     from "users"
  //     where "userId" = $1
  // `;
  // const params = [userId];
  // db.query(sql, params)
  //   .then(result => {
  //     const [user] = result.rows;
  //     if (!user) {
  //       throw new ClientError(404, 'User not found');
  //     }
  //   })
  //   .catch(err => next(err));
  const insertSql = `
        insert into "articles" ("userId", "imgUrl", "articleTypeId", "primaryColor",
                                "secondaryColor", "colorCategoryId", "secondaryColorCategoryId")
                        values ($1, $2, $3, $4, $5, $6, $7)
                      returning *
      `;
  const insertParams = [userId, imgUrl, articleTypeId, primaryColor, secondaryColor, colorCategoryId, secondaryColorCategoryId];
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
