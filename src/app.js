const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { writeInfoLog, writeErrorLog } = require('./common/winstonConfig');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

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
  writeInfoLog(req);
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use((err, req, res, next) => {
  if (err) {
    writeErrorLog(err);
    res.status(500).send({
      code: 500,
      error: 'Internal Server Error'
    });
  }
  next();
});

process.on('uncaughtException', err => {
  writeErrorLog(err);
});
// throw Error('uncaughtException: Oops!');

process.on('unhandledRejection', err => {
  writeErrorLog(err);
});
// Promise.reject(Error('unhandledRejection: Oops!'));

module.exports = app;
