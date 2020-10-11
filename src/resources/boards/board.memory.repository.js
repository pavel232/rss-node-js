const db = require('../db/in-memory-db');
const dataBase = db.dataBase;
const Board = require('./board.model');

const getAll = async () => {
  return await dataBase.boards;
};

const getBoard = async id => {
  return await dataBase.boards.find(board => board.id === id);
};

const postBoard = async board => {
  const newBoard = new Board(board);
  dataBase.boards.push(newBoard);
  return newBoard;
};

const putBoard = async (id, board) => {
  const index = db.getIndex('boards', id);

  if (index !== -1) {
    dataBase.boards[index] = { id, ...board };
    return dataBase.boards[index];
  }
  return false;
};

const deleteBoard = async id => {
  const index = db.getIndex('boards', id);

  if (index !== -1) {
    dataBase.boards.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getBoard, postBoard, putBoard, deleteBoard };
