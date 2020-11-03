const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');
const taskService = require('../tasks/task.service');
const handlerWrapper = require('../../common/handler-wrapper');
const { ServerError } = require('../../common/logs-handler/index');

router.route('/').get(
  handlerWrapper(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  handlerWrapper(async (req, res) => {
    const board = await boardsService.getBoard(req.params.id);
    if (!board) {
      throw new ServerError(404, `Board with id ${req.params.id} not found`);
    }

    res.status(200).json(Board.toResponse(board));
  })
);

router.route('/').post(
  handlerWrapper(async (req, res) => {
    const board = await boardsService.postBoard(req.body);
    res.status(200).json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  handlerWrapper(async (req, res) => {
    const board = await boardsService.putBoard(req.params.id, req.body);
    if (!board) {
      throw new ServerError(400, `Board with id ${req.params.id} not found`);
    }

    res.status(200).json(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  handlerWrapper(async (req, res) => {
    const isDeleted = await boardsService.deleteBoard(req.params.id);
    if (!isDeleted) {
      throw new ServerError(404, `Board with id ${req.params.id} not found`);
    }

    await taskService.deleteAllTasksWithBoard(req.params.id);
    res.status(204).json({
      code: 204,
      message: `Board with id ${req.params.id} has been deleted`
    });
  })
);

module.exports = router;
