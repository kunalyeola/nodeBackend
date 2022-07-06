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
  async login(data){
    try{
      if(!data.email || !data.password){
        throw new APIError(message.badRequest, StatusCodes.Bad)
      }
			const userDetails = await UserDatabase.getUser(data);
      
      if (Object.keys(userDetails).length === 0) {
				throw new APIError(message.noData, StatusCodes.NOT_FOUND);
			}
      delete userDetails.password;
			const token = await generateToken(userDetails);
			const userData = {
				user_id: userDetails.user_id,
				role_id: userDetails.role_id,
				is_profile_info_filled: userDetails.email && userDetails.wallet_address ? 1 : 0,
				wallet_address: userDetails.wallet_address,
				is_member: userDetails.is_member,
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
