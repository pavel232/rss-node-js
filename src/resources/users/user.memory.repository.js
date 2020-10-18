const db = require('../db/in-memory-db');
const dataBase = db.dataBase;
const User = require('./user.model');

const getAll = async () => {
  return await dataBase.users;
};

const getUser = async id => {
  return await dataBase.users.find(user => user.id === id);
};

const postUser = async user => {
  const newUser = await new User(user);
  dataBase.users.push(newUser);
  return newUser;
};

const putUser = async (id, user) => {
  const index = db.getIndex('users', id);

  if (index !== -1) {
    dataBase.users[index] = { id, ...user };
    return dataBase.users[index];
  }
  return false;
};

const deleteUser = async id => {
  const index = db.getIndex('users', id);
  if (index !== -1) {
    dataBase.users.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getUser, postUser, putUser, deleteUser };
