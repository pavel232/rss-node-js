const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

const createToken = payload => {
  return jwt.sign(payload, JWT_SECRET_KEY);
};

const checkToken = token => {
  return jwt.verify(token, JWT_SECRET_KEY);
};

module.exports = { createToken, checkToken };
