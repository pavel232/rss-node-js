const taskRepo = require('./task.memory.repository');

const getAll = boardId => taskRepo.getAll(boardId);
const getTask = (boardId, id) => taskRepo.getTask(boardId, id);
const postTask = (boardId, task) => taskRepo.postTask(boardId, task);
const putTask = (boardId, id, task) => taskRepo.putTask(boardId, id, task);
const deleteTask = (boardId, id) => taskRepo.deleteTask(boardId, id);
const deleteAllTasksWithBoard = boardId =>
  taskRepo.deleteAllTasksWithBoard(boardId);
const deleteAssignee = userId => taskRepo.deleteAssignee(userId);

module.exports = {
  getAll,
  getTask,
  postTask,
  putTask,
  deleteTask,
  deleteAllTasksWithBoard,
  deleteAssignee
};
