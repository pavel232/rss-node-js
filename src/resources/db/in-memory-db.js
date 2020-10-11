const dataBase = {
  users: [],
  boards: [],
  tasks: []
};

function getIndex(dbName, id, boardId) {
  if (boardId) {
    const boardIndex = getIndex('boards', boardId);
    if (boardIndex !== -1) {
      return dataBase[dbName].findIndex(e => e.id === id);
    }
    return -1;
  }
  return dataBase[dbName].findIndex(e => e.id === id);
}

module.exports = { dataBase, getIndex };
