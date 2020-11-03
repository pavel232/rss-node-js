const router = require('express').Router();
const loginService = require('./login.service');
const handlerWrapper = require('../../common/handler-wrapper');

router.post(
  '/',
  handlerWrapper(async (req, res) => {
    const { login, password } = req.body;
    const token = await loginService.signToken(login, password);
    res.status(200).json({ token });
  })
);

module.exports = router;
