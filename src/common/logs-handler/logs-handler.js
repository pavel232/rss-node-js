const logger = require('./winston-config');

function writeInfoLog(string, req) {
  if (req) {
    const method = req.method;
    const url = req.url;
    const query = req.query;
    const body = req.body.password
      ? { ...req.body, password: '*****' }
      : req.body;

    logger.info(
      `METHOD: ${method} :: URL: ${url} :: PARAMETERS: ${JSON.stringify(
        query
      )} :: BODY: ${JSON.stringify(body)}`
    );
  } else logger.info(string);
}

function writeErrorLog(err, str) {
  if (err.code) {
    logger.error(
      `CODE: ${err.code} :: INTERNAL MESSAGE: ${err.internalMessage} :: MESSAGE: ${err.message}`
    );
  } else {
    logger.error(
      `TYPE: ${str} :: INTERNAL MESSAGE: ${err.internalMessage} :: MESSAGE: ${err.message}`
    );
  }
}

module.exports = { writeInfoLog, writeErrorLog };
