const { checkToken } = require('./jwt');
const handlerWrapper = require('./handler-wrapper');
const { PATH_WHITELIST } = require('./config');
const { ServerError } = require('./logs-handler/index');

module.exports = handlerWrapper(async (req, res, next) => {
  const isNext = PATH_WHITELIST.includes(req.path);
  if (isNext) {
    return next();
  }
  const authParams = req.header('Authorization');
  if (!authParams) {
    throw new ServerError(
      401,
      'Access denied',
      'Not found Authorization Header'
    );
  }
  const [type, token] = authParams.split(' ');
  if (type !== 'Bearer') {
    throw new ServerError(
      401,
      'Access denied',
      'Authorization type is not Bearer'
    );
  }
  try {
    await checkToken(token);
  } catch (err) {
    throw new ServerError(401, 'Access denied', err);
  }
  return next();
});
