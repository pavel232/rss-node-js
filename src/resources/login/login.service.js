const { findUserLogin } = require('../users/user.service');
const { checkPassword } = require('../../common/hash');
const { createToken } = require('../../common/jwt');
const { ServerError } = require('../../common/logs-handler/index');

const signToken = async (login, password) => {
  const user = await findUserLogin(login);
  if (!user) {
    throw new ServerError(
      403,
      'Incorrect login or password',
      `Not found user with login '${login}'`
    );
  }

  const isEqualPass = await checkPassword(password, user.password);
  if (!isEqualPass) {
    throw new ServerError(
      403,
      'Incorrect login or password',
      'Error comparing passwords hash'
    );
  }

  const payload = { login, id: user._id };

  return createToken(payload);
};

module.exports = {
  signToken
};
