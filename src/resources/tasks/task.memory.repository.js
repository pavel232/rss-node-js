const db = require('../db/in-memory-db');
const dataBase = db.dataBase;
const Task = require('./task.model');

const getAll = async boardId => {
  return await dataBase.tasks.filter(task => task.boardId === boardId);
};

const getTask = async (boardId, id) => {
  return await dataBase.tasks.find(
    task => task.boardId === boardId && task.id === id
  );
};

const postTask = async (boardId, task) => {
  task.boardId = boardId;
  const newTask = new Task(task);
  dataBase.tasks.push(newTask);
  return newTask;
};

const putTask = async (boardId, id, task) => {
  const index = db.getIndex('tasks', id, boardId);
  if (index !== -1) {
    dataBase.tasks[index] = { id, ...task };
    return dataBase.tasks[index];
  }
  return false;
};

const deleteTask = async (boardId, id) => {
  const index = db.getIndex('tasks', id, boardId);
  if (index !== -1) {
    dataBase.tasks.splice(index, 1);
    return true;
  }
  return false;
};

const deleteAllTasksWithBoard = async boardId => {
  dataBase.tasks = dataBase.tasks.filter(e => e.boardId !== boardId);
};

const deleteAssignee = async userId => {
  dataBase.tasks.forEach(e => {
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
