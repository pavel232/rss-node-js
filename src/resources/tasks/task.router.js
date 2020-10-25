const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');
const handlerWrapper = require('../../common/handler-wrapper');
const { serverError } = require('../../common/logs-handler/index');

router.route('/').get(
  handlerWrapper(async (req, res) => {
    const boardId = req.params.boardId;
    const tasks = await taskService.getAll(boardId);
    res.status(200).json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  handlerWrapper(async (req, res) => {
    const boardId = req.params.boardId;
    const task = await taskService.getTask(boardId, req.params.id);
    if (task) {
      res.status(200).json(Task.toResponse(task));
    } else {
      throw new serverError(`Task with id ${req.params.id} not found`, 404);
    }
  })
);

router.route('/').post(
  handlerWrapper(async (req, res) => {
    const boardId = req.params.boardId;
    const task = await taskService.postTask(boardId, req.body);
    res.status(200).json(Task.toResponse(task));
  })
);

router.route('/:id').put(
  handlerWrapper(async (req, res) => {
    const boardId = req.params.boardId;
    const task = await taskService.putTask(boardId, req.params.id, req.body);
    if (task) {
      res.status(200).json(Task.toResponse(task));
    } else {
      throw new serverError(`Task with id ${req.params.id} not found`, 400);
    }
  })
);

router.route('/:id').delete(
  handlerWrapper(async (req, res) => {
    const boardId = req.params.boardId;
    const isDeleted = await taskService.deleteTask(boardId, req.params.id);
    if (isDeleted) {
      res.status(204).json({
        code: 204,
        message: `Task with id ${req.params.id} has been deleted`
      });
    } else {
      throw new serverError(`Task with id ${req.params.id} not found`, 404);
    }
  })
);

module.exports = router;
