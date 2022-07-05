const { verifyToken, response, generateToken, decryptRequestData } = require("../utils");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const message = require("../constants");

module.exports = {
  validateToken: async (req, res, next) => {
    const { headers } = req;
    try {
      if (headers["x-auth-token"]) {
        const tokenDecryptInfo = await verifyToken(headers["x-auth-token"]);
        if (tokenDecryptInfo.data) {
          res.locals.token = tokenDecryptInfo.data;
          const token = await generateToken(tokenDecryptInfo.data);
          res.header("x-auth-token", token);
          next();
        } else {
          res.status(StatusCodes.UNAUTHORIZED);
          res.send(
            response(
              message.sessionExpired,
              {}
            )
          );
        }
      } else {
        res.status(StatusCodes.UNAUTHORIZED);
        res.send(
          response(
            message.connectWallet,
            {}
          )
        );
      }
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.send(
        response(
          e.message,
          {}
        )
      );
    }
  },
  decryptRequest: async (req, res, next) => {
    try {
      if (req.body) {
        const data = req.body.encrypted_req ? req.body.encrypted_req : req.body;
        const requestData = await decryptRequestData(data);
        res.locals.requestBody = requestData;
        res.locals.requestFiles = req.files;
        next();
      } else {
        res.status(StatusCodes.BAD_REQUEST);
        res.send(
          response(
            ReasonPhrases.BAD_REQUEST,
            {}
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
};
