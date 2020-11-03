const User = require('./user.model');

const getAll = async () => await User.find({});

const getUser = async id => await User.findById(id);

const postUser = async user => await User.create(user);

const putUser = async (id, user) => await User.findByIdAndUpdate(id, user);

const deleteUser = async id => await User.findByIdAndDelete(id);

const findUserLogin = async login => await User.findOne({ login });

module.exports = {
  getAll,
  getUser,
  postUser,
  putUser,
  deleteUser,
  findUserLogin
};
