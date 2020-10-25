const { PORT } = require('./common/config');
const app = require('./app');
const { writeInfoLog } = require('./common/logs-handler/index');
const { MONGO_CONNECTION_STRING } = require('./common/config');
const mongoose = require('mongoose');
const serverError = require('./common/logs-handler/server-error.class');

app.listen(PORT, () =>
  writeInfoLog(`App is running on http://localhost:${PORT}`)
);

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
