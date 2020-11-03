const usersRepo = require('./user.db.repository');
const { hashPassword } = require('../../common/hash');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const postUser = async user => {
  const hashPass = await hashPassword(user.password);
  const newUser = {
    ...user,
    password: hashPass
  };

  return await usersRepo.postUser(newUser);
};

const putUser = (id, user) => usersRepo.putUser(id, user);

const deleteUser = id => usersRepo.deleteUser(id);

const findUserLogin = login => usersRepo.findUserLogin(login);

module.exports = {
  getAll,
  getUser,
  postUser,
  putUser,
  deleteUser,
  findUserLogin
};
