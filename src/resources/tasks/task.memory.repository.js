const db = require('../db/in-memory-db');
const tasksDb = db.dataBase.tasks;
const Task = require('./task.model');

const getAll = async boardId => {
  return await tasksDb.filter(task => task.boardId === boardId);
};

const getTask = async (boardId, id) => {
  return await tasksDb.find(task => task.boardId === boardId && task.id === id);
};

const postTask = async (boardId, task) => {
  task.boardId = boardId;
  const newTask = new Task(task);
  tasksDb.push(newTask);
  return newTask;
};

const putTask = async (boardId, id, task) => {
  const index = db.getIndex('tasks', id, boardId);

  if (index !== -1) {
    const newTask = new Task(task);
    tasksDb[index] = newTask;
    return newTask;
  }
  return false;
};

const deleteTask = async (boardId, id) => {
  const index = db.getIndex('tasks', id, boardId);
  if (index !== -1) {
    tasksDb.splice(index, 1);
    return true;
  }
  return false;
};

const deleteAllTasksWithBoard = async boardId => {
  tasksDb.forEach((e, i) => {
    if (e.boardId === boardId) {
      // tasksDb.splice(i, 1);
      tasksDb[i] = {};
    }
  });
};

const deleteAssignee = async userId => {
  tasksDb.forEach(e => {
    if (e.userId === userId) {
      e.userId = null;
    }
  });
};

module.exports = {
  getAll,
  getTask,
  postTask,
  putTask,
  deleteTask,
  deleteAllTasksWithBoard,
  deleteAssignee
};
