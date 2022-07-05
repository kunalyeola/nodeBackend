const { StatusCodes } = require("http-status-codes");
const { response } = require("../utils");
module.exports = {
  errorMiddleware: async (error, req, res) => {
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).send(
      response(
        error.message,
        error.data,
        error.stack
      )
    );
  }
};
