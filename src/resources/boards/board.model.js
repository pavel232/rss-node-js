const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'new Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = this.addColumns(columns);
  }

  addColumns(arr) {
    return arr.map(e => {
      return {
        id: e.id ? e.id : uuid(),
        title: e.title,
        order: e.order
      };
    });
  }
}

module.exports = Board;
