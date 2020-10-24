const mongoose = require('mongoose');
const { writeInfoLog } = require('../common/logs-handler/index');
const { serverError } = require('../common/handler-wrapper');
const { MONGO_CONNECTION_STRING } = require('../common/config');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', err => {
  throw new serverError(`Error connect to DataBase, ${err}`);
});
db.once('open', () => {
  writeInfoLog('Connected to DataBase successfully');
});
