const { StatusCodes } = require("http-status-codes");
const config = require("../../../config");
const message = require("../../../constants/message");
// const message = require("../../../constants/message");
const APIError = require("../../../helpers/api-error");
const UserDatabase = require("./mysql");
const { fileUpload, generateToken } = require("../../../utils");
// const {validateToken} = require("../../../middlewares");

class UserService {
  async signUp(data){
    try{
      if(!data.email || !data.password || !data.username ){
        throw new APIError(message.badRequest, StatusCodes.BAD_REQUEST);
      }
      const user = await UserDatabase.getUser({ email:data.email });

      if (Object.keys(user).length != 0) {
				throw new APIError(`${data.email} is aleredy registerd`, StatusCodes.NOT_FOUND);
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
  async submitProfile(data, token){
    try{
      if(
        !token.userId ||
        !data.username ||
        !data.fullname ||
        !data.bloodgroup 
      ){
        throw new APIError(message.badRequest, StatusCodes.Bad)
      }
      data.action = "profile";
			const userDetails = await UserDatabase.submitProfile(data);
      console.log(userDetails);
      if (Object.keys(userDetails).length === 0) {
				throw new APIError(message.noData, StatusCodes.NOT_FOUND);
			}
     	
			return {
				status: StatusCodes.OK,
				message: message.success,
				data: {}
			};
		} catch (error) {
			throw new APIError(error.message, error.status, error.data);
		}
  }
  async login(data){
    try{
      if(!data.email || !data.password){
        throw new APIError(message.badRequest, StatusCodes.Bad)
      }
			const userDetails = await UserDatabase.getUser(data);
      console.log(userDetails);
      if (Object.keys(userDetails).length === 0) {
				throw new APIError(message.noData, StatusCodes.NOT_FOUND);
			}
      if(userDetails.password != data.password){
        throw new APIError(`Invalid detaills`, StatusCodes.BAD_REQUEST);
      }
      delete userDetails.password;
			const token = await generateToken(userDetails);
      console.log(token)
			const userData = {
				user_id: userDetails.user_id,
				role_id: userDetails.role_id,
				x_auth_token: token
			};
			return {
				status: StatusCodes.OK,
				message: message.login,
				data: userData
			};
		} catch (error) {
			throw new APIError(error.message, error.status, error.data);
		}
  }
}
module.exports = new UserService();
