const logger = require("../../../helpers/logger");
const { response } = require("../../../utils");
const Web3Service = require("./web3");

module.exports = {
  getAllEvent: async (req, res, next) => {
    try {
      const web3Data = await Web3Service.getAllEvent();
      res.status(web3Data.status);
      res.send(
        response(web3Data.message,
          web3Data.data)
      );
    } catch (error) {
      logger.serverLogger(error);
      next(error);
    }
  }
};
