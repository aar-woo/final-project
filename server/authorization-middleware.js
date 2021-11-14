const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  const tokenHeader = req.headers['x-access-token'];

  if (!tokenHeader) {
    throw new ClientError(401, 'authentication required');
  }
  const payload = jwt.verify(tokenHeader, process.env.TOKEN_SECRET);
  req.user = payload;
  next();
}

module.exports = authorizationMiddleware;
