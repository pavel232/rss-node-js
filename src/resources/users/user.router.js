const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const taskService = require('../tasks/task.service');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.status(200).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    const user = await usersService.getUser(req.params.id);
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else res.status(404).json({});
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const user = await usersService.postUser(req.body);
    res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    const user = await usersService.putUser(req.params.id, req.body);
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else res.status(404).json({});
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    const isDeleted = await usersService.deleteUser(req.params.id);
    if (isDeleted) {
      taskService.deleteAssignee(req.params.id);
      res.status(204).json({});
    } else res.status(404).json({});
  })
);

function wrapAsync(callback) {
  return callback;
}

module.exports = router;
