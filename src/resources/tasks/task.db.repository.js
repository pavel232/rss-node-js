// const Task = require('./task.model');

// const getAll = async boardId => {
//   return await Task.find({ boardId });
// };

// const getTask = async (boardId, id) => {
//   return await Task.find({ _id: id, boardId });
// };

// const postTask = async (boardId, task) => {
//   task.boardId = boardId;
//   return await Task.create(task);
// };

// const putTask = async (boardId, id, task) => {
//   return await Task.findOneAndUpdate({ _id: id, boardId }, task);
// };

// const deleteTask = async (boardId, id) => {
//   return await Task.findOneAndRemove({ _id: id, boardId });
// };

// const deleteAllTasksWithBoard = async boardId => {
//   return await Task.deleteMany({ boardId });
// };

// const deleteAssignee = async userId => {
//   return await Task.updateMany({ userId }, { userId: null });
// };

// module.exports = {
//   getAll,
//   getTask,
//   postTask,
//   putTask,
//   deleteTask,
//   deleteAllTasksWithBoard,
//   deleteAssignee
// };
