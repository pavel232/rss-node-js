const Board = require('./board.model');

const getAll = async () => await Board.find({});

const getBoard = async id => await Board.findById(id);

const postBoard = async board => Board.create(board);

const putBoard = async (id, board) => await Board.findByIdAndUpdate(id, board);

const deleteBoard = async id => await Board.findByIdAndDelete(id);

module.exports = { getAll, getBoard, postBoard, putBoard, deleteBoard };
