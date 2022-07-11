const { StatusCodes } = require("http-status-codes");
const config = require("../../../config");
const message = require("../../../constants/message");
// const message = require("../../../constants/message");
const APIError = require("../../../helpers/api-error");
const UserDatabase = require("./mysql");
const validator = require("validator");
const fs = require("fs");
const { fileUpload, generateToken , sendEmail } = require("../../../utils");
// const {validateToken} = require("../../../middlewares");

class UserService {
  async signUp(data){
    try{
      if(!data.email || !data.password || !data.username ){
        throw new APIError(message.badRequest, StatusCodes.BAD_REQUEST);
      }
      const user = await UserDatabase.getUser({ email:data.email });

      if (Object.keys(user).length != 0) {
				throw new APIError(`${data.email} is already registered`, StatusCodes.NOT_FOUND);
			}
      const userDetails =await UserDatabase.SignUp(data);
      console.log(userDetails);
      if (Object.keys(userDetails).length === 0) {
				throw new APIError(message.noData, StatusCodes.NOT_FOUND);
			}
      // let emailBody = fs
			// 		.readFileSync(`${config.rootDir}/templates/email/forgot-password.html`, "utf8")
			// 		.toString();
			// 	emailBody = emailBody
			// 		.replace("$email_logo_link", `${config.apiURL}${config.emailLogoURL}`)
			// 		.replace("$link", link)
			// 		.replace("$link", link);
        let emailBody = `hello Welcome to BloodBank application `
				const email = await sendEmail(data.email, message.signUpEmail, emailBody);
        console.log(email);
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
        throw new APIError(message.badRequest, StatusCodes.BAD_REQUEST)
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
  async forgotPassword(data){
    try{
      if(!data.email){
        throw new APIError(message.badRequest, StatusCodes.BAD_REQUEST)
      }
      if (!validator.isEmail(data.email)) {
				throw new APIError(message.invalidEmail, StatusCodes.BAD_REQUEST);
			}
			const userDetails = await UserDatabase.getUser({email: data.email});
      console.log(userDetails);
      if (Object.keys(userDetails).length > 0) {
				const token = await generateToken({ email: data.email, role_id: userDetails.role_id });
				let link =`${config.apiUrl}/user/reset-password/?q=${token}`
				let emailBody = fs  
					.readFileSync(`${config.rootDir}/templates/forgot-password.html`, "utf8")
					.toString();
				emailBody = emailBody
					.replace("$link", link)
					.replace("$link", link);

				await sendEmail(data.email, message.resetPasswordEmailSubject, emailBody);
			}
    
      return {
				status: StatusCodes.OK,
				message: message.forgotPassword,
				data: {}
			};
		} catch (error) {
			throw new APIError(error.message, error.status, error.data);
		}
  }
  async resetPassword(data) {
		try {
			if (
				!data.password ||
				!data.token
			) {
				throw new APIError(message.badRequest, StatusCodes.BAD_REQUEST);
			}

			const user = await verifyToken(data.token);
			const userDetails = await commonDatabase.getUser({ email: user.data.email });
			if (Object.keys(userDetails).length === 0) {
				throw new APIError(message.noData, StatusCodes.NOT_FOUND);
			}

			data.user_id = userDetails.user_id;
			data.password = encryptString(data.password);
			data.action = "password";
			await commonDatabase.submitUser(data);

			return {
				status: StatusCodes.OK,
				message: message.resetPassword,
				data: {
					role_id: userDetails.role_id
				}
			};
		} catch (error) {
			throw new APIError(error.message, error.status);
		}
	}

}
module.exports = new UserService();
