const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');
const taskService = require('../tasks/task.service');
const handlerWrapper = require('../../common/handler-wrapper');
const { serverError } = require('../../common/logs-handler/index');

router.route('/').get(
  handlerWrapper(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  handlerWrapper(async (req, res) => {
    const board = await boardsService.getBoard(req.params.id);
    if (board) {
      res.status(200).json(Board.toResponse(board));
    } else {
      throw new serverError(`Board with id ${req.params.id} not found`, 404);
    }
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
    if (board) {
      res.status(200).json(Board.toResponse(board));
    } else {
      throw new serverError(`Board with id ${req.params.id} not found`, 400);
    }
  })
);

router.route('/:id').delete(
  handlerWrapper(async (req, res) => {
    const deletedBoard = await boardsService.deleteBoard(req.params.id);
    if (deletedBoard) {
      taskService.deleteAllTasksWithBoard(req.params.id);
      res.status(204).json({
        code: 204,
        message: `Board with id ${req.params.id} has been deleted`
      });
    } else {
      throw new serverError(`Board with id ${req.params.id} not found`, 404);
    }
  })
);

module.exports = router;
