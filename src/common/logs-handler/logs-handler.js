const logger = require('./winston-config');
const User = require('../../resources/users/user.model');

function writeInfoLog(string, req) {
  if (req) {
    const method = req.method;
    const url = req.url;
    const query = req.query;
    const body = url === '/users' ? User.toResponse(req.body) : req.body;

    logger.info(
      `METHOD: ${method} :: URL: ${url} :: PARAMETERS: ${JSON.stringify(
        query
      )} :: BODY: ${JSON.stringify(body)}`
    );
  } else logger.info(string);
}

function writeErrorLog(err, str) {
  if (err.code) {
    logger.error(`CODE: ${err.code} :: MESSAGE: ${err.message}`);
  } else logger.error(`TYPE: ${str} :: MESSAGE: ${err.message}`);
}

module.exports = { writeInfoLog, writeErrorLog };
