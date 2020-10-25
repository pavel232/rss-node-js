const boardRepo = require('./board.db.repository');

const getAll = () => boardRepo.getAll();
const getBoard = id => boardRepo.getBoard(id);
const postBoard = board => boardRepo.postBoard(board);
const putBoard = (id, board) => boardRepo.putBoard(id, board);
const deleteBoard = id => boardRepo.deleteBoard(id);

module.exports = { getAll, getBoard, postBoard, putBoard, deleteBoard };
