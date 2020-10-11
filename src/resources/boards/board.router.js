const router = require('express').Router();
const boardsService = require('./board.service');
const taskService = require('../tasks/task.service');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards);
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    const board = await boardsService.getBoard(req.params.id);
    if (board) {
      res.status(200).json(board);
    } else res.status(404).json({});
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const board = await boardsService.postBoard(req.body);
    res.status(200).json(board);
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    const board = await boardsService.putBoard(req.params.id, req.body);
    if (board) {
      res.status(200).json(board);
    } else res.status(404).json({});
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    const isDeleted = await boardsService.deleteBoard(req.params.id);
    if (isDeleted) {
      taskService.deleteAllTasksWithBoard(req.params.id);
      res.status(204).json({});
    } else res.status(404).json({});
  })
);

function wrapAsync(callback) {
  return callback;
}

module.exports = router;
