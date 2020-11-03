const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const taskService = require('../tasks/task.service');
const handlerWrapper = require('../../common/handler-wrapper');
const { ServerError } = require('../../common/logs-handler/index');

router.route('/').get(
  handlerWrapper(async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  handlerWrapper(async (req, res) => {
    const user = await usersService.getUser(req.params.id);
    if (!user) {
      throw new ServerError(404, `User with id ${req.params.id} not found`);
    }

    res.status(200).json(User.toResponse(user));
  })
);

router.route('/').post(
  handlerWrapper(async (req, res) => {
    const user = await usersService.postUser(req.body);
    res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  handlerWrapper(async (req, res) => {
    const user = await usersService.putUser(req.params.id, req.body);
    if (!user) {
      throw new ServerError(400, `User with id ${req.params.id} not found`);
    }

    res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  handlerWrapper(async (req, res) => {
    const isDeleted = await usersService.deleteUser(req.params.id);
    if (!isDeleted) {
      throw new ServerError(404, `User with id ${req.params.id} not found`);
    }

    await taskService.deleteAssignee(req.params.id);
    res.status(204).json({
      code: 204,
      message: `User with id ${req.params.id} has been deleted`
    });
  })
);

module.exports = router;
