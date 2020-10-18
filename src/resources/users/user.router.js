const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const taskService = require('../tasks/task.service');
const handlerWrapper = require('../../common/handlerWrapper');

router.route('/').get(
  handlerWrapper(async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  handlerWrapper(async (req, res) => {
    const user = await usersService.getUser(req.params.id);
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else res.status(400).json({});
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
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else res.status(400).json({});
  })
);

router.route('/:id').delete(
  handlerWrapper(async (req, res) => {
    const isDeleted = await usersService.deleteUser(req.params.id);
    if (isDeleted) {
      taskService.deleteAssignee(req.params.id);
      res.status(204).json({});
    } else res.status(404).json({});
  })
);

module.exports = router;
