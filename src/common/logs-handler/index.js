const { writeInfoLog, writeErrorLog } = require('./logs-handler');
const ServerError = require('./server-error.class');

module.exports = { writeInfoLog, writeErrorLog, ServerError };
