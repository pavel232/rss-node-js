const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

const createToken = async payload => {
  return await jwt.sign(payload, JWT_SECRET_KEY);
};

const checkToken = async token => {
  return await jwt.verify(token, JWT_SECRET_KEY);
};

module.exports = { createToken, checkToken };
