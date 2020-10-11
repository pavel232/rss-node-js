const router = require('express').Router();
const taskService = require('./task.service');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const boardId = getBoardId(req.baseUrl);
    const tasks = await taskService.getAll(boardId);
    res.status(200).json(tasks);
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    const boardId = getBoardId(req.baseUrl);
    const task = await taskService.getTask(boardId, req.params.id);
    if (task) {
      res.status(200).json(task);
    } else res.status(404).json({});
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const boardId = getBoardId(req.baseUrl);
    const task = await taskService.postTask(boardId, req.body);
    res.status(200).json(task);
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    const boardId = getBoardId(req.baseUrl);
    const task = await taskService.putTask(boardId, req.params.id, req.body);
    if (task) {
      res.status(200).json(task);
    } else res.status(404).json({});
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    const boardId = getBoardId(req.baseUrl);
    const isDeleted = await taskService.deleteTask(boardId, req.params.id);
    if (isDeleted) {
      res.status(204).json([]);
    } else res.status(404).json({});
  })
);

function getBoardId(url) {
  return url.split('/')[2];
}

function wrapAsync(callback) {
  return callback;
}

module.exports = router;