const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'New task',
    order = 0,
    description = 'Task description',
    userId = 'id',
    boardId = 'id',
    columnId = 'id'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
