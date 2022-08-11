const { StatusCodes } = require("http-status-codes");
const { response } = require("../../../utils");
const logs = require("../../../helpers/logger");
const userService = require("./user");
const APIError = require("../../../helpers/api-error");
// const { message } = require("../../../helpers");
module.exports = {
  getUser: async (req, res, next) => {
    try {
      // const userDetails = await userService.submitBannerImg(res.locals.token, res.locals.requestBody, res.locals.requestFiles);
      res.status(StatusCodes.OK);
      // logs.serverLogger("hello kina")
      res.send(
        response(
          " Hello success messge ",
          "2344"
        )
      );
    } catch (error) {
      logs.serverLogger(error);
      next(error);
    }
  },
  getUserById : async(req,res, next)=>{
    try {
      const userDetails = await userService.getUserById(req.params.user_id);
      res.status(userDetails.status);
      res.send(response(userDetails.message, 
        userDetails.data))
    } catch (error) {
      // logs.serverLogger(error);
      next(error);
    }
  },
  forgotPassword :async(req,res, next)=>{
    try {
      const userDetails = await userService.forgotPassword(req.body);
      res.status(userDetails.status);
      res.send(response(userDetails.message, 
        userDetails.data))
    } catch (error) {
      logs.serverLogger(error);
      next(error);
    }
  },
  
  submitProfile : async(req, res, next)=>{
    try {
      const userDetails = await userService.submitProfile(req.body);
      
      res.status(userDetails.status);
      res.send(response(userDetails.message, 
        userDetails.data))
    } catch (error) {
      // logs.serverLogger(error);
      next(error);
    }
  },
  login : async(req, res, next)=>{
    try {
      const userDetails = await userService.login(req.body);
      res.status(userDetails.status);
      res.send(response(userDetails.message, 
        userDetails.data))
    } catch (error) {
      logs.serverLogger(error);
      next(error);
    }
  },
  submitData: async (req, res, next) => {
    try {
      const userDetails = await userService.submitData(req);
      res.status(userDetails.status);
      res.send(
        response(userDetails.message,
          userDetails.data)
      );
    } catch (error) {
      logs.serverLogger(error);
      next(error);
    }
  },
  getFiles: async (req, res, next) => {
    try {
      const fileDetails = await userService.getFiles(req.files);
      res.status(fileDetails.status);
      res.send(
        response(fileDetails.me)
      );
    } catch (error) {
      logs.serverLogger(error);
      next(error);
    }
  },
  signUp:  async(req, res, next)=>{
    try {
      const userDetails = await userService.signUp(req.body);
      console.log(userDetails);
      res.status(userDetails.status);
      res.send(
        response(userDetails.message, userDetails.data)
      );
    } catch (error) {
      logs.serverLogger(error);
      next(error);
    }
  },
  getuserlist: async(req, res, next)=>{
    try {
      const userDetails = await userService.getuserlist(req.query);
      console.log(userDetails);
      res.status(userDetails.status);
      res.send(
        response(userDetails.message, userDetails.data)
      );
    } catch (error) {
      logs.serverLogger(error);
      next(error)
    }
  },
  resetPassword :async(req, res, next)=>{
    try {
      console.log(req.body);
			const userDetails = await userService.resetPassword(req.body);
			res.status(userDetails.status);
			res.send(
				response(
					userDetails.message,
					userDetails.data
				)
			);
		} catch (error) {
			//logger.serverLogger(error);
			next(error);
		}
  }
};
