const { StatusCodes } = require("http-status-codes");
const config = require("../../../config");
const message = require("../../../constants/message");
// const message = require("../../../constants/message");
const APIError = require("../../../helpers/api-error");
const UserDatabase = require("./mysql");
const { fileUpload } = require("../../../utils");
// const {validateToken} = require("../../../middlewares");

class UserService {
  async signUp(data){
    try{
      if(!data.email || !data.password){
        throw new APIError(message.badRequest, StatusCodes.BAD_REQUEST);
      }
      const userDetails =await UserDatabase.SignUp(data);
      console.log(userDetails);
      if (Object.keys(userDetails).length === 0) {
				throw new APIError(message.noData, StatusCodes.NOT_FOUND);
			}
      
     
      return {
        status : StatusCodes.OK,
        message : message.success,
        data : userDetails.user_id
      }
    }catch(error){
      throw new APIError(error.message, StatusCodes.BAD_REQUEST)
    }
  }
 
}
module.exports = new UserService();
