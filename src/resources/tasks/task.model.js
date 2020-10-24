const mongoose = require('mongoose');
const uuid = require('uuid');

const taskSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    order: String,
    description: String,
    userId: String,
    BoardId: String,
    columnId: String
  },
  { versionKey: false }
);

const Task = mongoose.model('Task', taskSchema);

// class Task {
//   constructor({
//     id = uuid(),
//     title = 'New task',
//     order = 0,
//     description = 'Task description',
//     userId = 'id',
//     boardId = 'id',
//     columnId = 'id'
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }
// }

module.exports = Task;
