const { createLogger, format, transports } = require('winston');
const User = require('../resources/users/user.model');

const options = {
  console: {
    handleExceptions: false,
    json: false,
    colorize: true
  },
  infoFile: {
    level: 'info',
    filename: `${__dirname}/../logs/logs.log`,
    maxSize: 5242880,
    maxFiles: 1
  },
  errorFile: {
    level: 'error',
    filename: `${__dirname}/../logs/errors.log`,
    maxSize: 5242880,
    maxFiles: 1
  }
};

const logger = createLogger({
  transports: [
    new transports.Console(options.console),
    new transports.File(options.infoFile),
    new transports.File(options.errorFile)
  ],
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss Z' }),
    format.printf(opt => `${opt.level} [${opt.timestamp}] :: ${opt.message}`)
  ),
  exitOnError: false
});

function writeInfoLog(req) {
  const method = req.method;
  const url = req.url;
  const query = req.query;
  const body = url === '/users' ? User.toResponse(req.body) : req.body;

  logger.info(
    `METHOD: ${method} :: URL: ${url} :: PARAMETERS: ${JSON.stringify(
      query
    )} :: BODY: ${JSON.stringify(body)}`
  );
}

function writeErrorLog(err) {
  logger.error(err);
}

module.exports = { logger, writeInfoLog, writeErrorLog };
