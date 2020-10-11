const db = require('../db/in-memory-db');
const boardsDb = db.dataBase.boards;
const Board = require('./board.model');

const getAll = async () => {
  return await boardsDb;
};

const getBoard = async id => {
  return await boardsDb.find(board => board.id === id);
};

const postBoard = async board => {
  const newBoard = new Board(board);
  boardsDb.push(newBoard);
  return newBoard;
};

const putBoard = async (id, board) => {
  const index = db.getIndex('boards', id);

  if (index !== -1) {
    board.id = id;
    const newBoard = new Board(board);
    boardsDb[index] = newBoard;
    return boardsDb[index];
  }
  return false;
};

const deleteBoard = async id => {
  const index = db.getIndex('boards', id);

  if (index !== -1) {
    boardsDb.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getBoard, postBoard, putBoard, deleteBoard };
