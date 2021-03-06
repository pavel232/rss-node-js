const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { writeInfoLog, writeErrorLog } = require('./common/logs-handler/index');
const loginRouter = require('./resources/login/login.router');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const checkAuth = require('./common/auth.middleware');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use((req, res, next) => {
  writeInfoLog('', req);
  next();
});

app.use('/', checkAuth);

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

const exit = process.exit;

app.use((err, req, res, next) => {
  if (err) {
    writeErrorLog(err, 'Express App Error');
    res.status(err.code).send({
      code: err.code,
      message: err.message
    });
  }
  next();
});

process.on('uncaughtException', err => {
  writeErrorLog(err, 'Uncaught Exception');
  exit(1);
});
// throw Error('uncaughtException: Oops!');

process.on('unhandledRejection', err => {
  writeErrorLog(err, 'Unhandled Rejection');
  exit(2);
});
// Promise.reject(Error('unhandledRejection: Oops!'));

module.exports = app;
