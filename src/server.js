const { PORT } = require('./common/config');
const app = require('./app');
const { writeInfoLog } = require('./common/logs-handler/index');

app.listen(PORT, () =>
  writeInfoLog(`App is running on http://localhost:${PORT}`)
);
