const { writeInfoLog, writeErrorLog } = require('./logs-handler');
const serverError = require('./server-error.class');

module.exports = { writeInfoLog, writeErrorLog, serverError };
