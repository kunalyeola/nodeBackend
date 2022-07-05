module.exports = class APIError extends Error {
  constructor (message, httpStatus) {
    super(message);
    this.status = httpStatus;
    // Error.captureStackTrace(this, this.constructor);
  }
};
