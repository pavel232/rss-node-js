class ServerError extends Error {
  constructor(code, responseMessage, internalMessage) {
    super();
    this.code = code;
    this.message = responseMessage;
    this.internalMessage = internalMessage;
  }
}

module.exports = ServerError;
