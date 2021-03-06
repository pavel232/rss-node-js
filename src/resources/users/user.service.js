const usersRepo = require('./user.db.repository');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const postUser = user => usersRepo.postUser(user);

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
