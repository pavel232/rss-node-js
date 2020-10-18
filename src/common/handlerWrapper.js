const handlerWrapper = callback => async (req, res, next) => {
  try {
    return await callback(req, res);
  } catch (err) {
    return next(err);
  }
};

module.exports = handlerWrapper;
