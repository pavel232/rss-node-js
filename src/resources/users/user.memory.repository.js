const db = require('../db/in-memory-db');
const usersDb = db.dataBase.users;
const User = require('./user.model');

const getAll = async () => {
  return await usersDb;
};

const getUser = async id => {
  return await usersDb.find(user => user.id === id);
};

const postUser = async user => {
  const newUser = await new User(user);
  usersDb.push(newUser);
  return newUser;
};

const putUser = async (id, user) => {
  const index = db.getIndex('users', id);

  if (index !== -1) {
    usersDb[index].name = user.name;
    usersDb[index].login = user.login;
    usersDb[index].password = user.password;
    return usersDb[index];
  }
  return false;
};

const deleteUser = async id => {
  const index = db.getIndex('users', id);
  if (index !== -1) {
    usersDb.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getUser, postUser, putUser, deleteUser };
