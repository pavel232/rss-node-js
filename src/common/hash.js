const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('./config');
const { ServerError } = require('./logs-handler/index');

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw new ServerError(500, 'Internal Server Error', err);
  }
}

async function checkPassword(password, hash) {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    throw new ServerError(500, 'Internal Server Error', err);
  }
}

module.exports = { hashPassword, checkPassword };
