const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');
const handlerWrapper = require('../../common/handler-wrapper');
const { ServerError } = require('../../common/logs-handler/index');

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
    if (!task) {
      throw new ServerError(404, `Task with id ${req.params.id} not found`);
    }

    res.status(200).json(Task.toResponse(task));
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
    if (!task) {
      throw new ServerError(400, `Task with id ${req.params.id} not found`);
    }

    res.status(200).json(Task.toResponse(task));
  })
);

router.route('/:id').delete(
  handlerWrapper(async (req, res) => {
    const boardId = req.params.boardId;
    const isDeleted = await taskService.deleteTask(boardId, req.params.id);
    if (!isDeleted) {
      throw new ServerError(404, `Task with id ${req.params.id} not found`);
    }

    res.status(204).json({
      code: 204,
      message: `Task with id ${req.params.id} has been deleted`
    });
  })
);

module.exports = router;
