const { StatusCodes } = require("http-status-codes");
const config = require("../../../config");
const message = require("../../../constants/message");
// const message = require("../../../constants/message");
const APIError = require("../../../helpers/api-error");
const UserDatabase = require("./mysql");
const validator = require("validator");
const fs = require("fs");
const { fileUpload, generateToken , verifyToken,sendEmail } = require("../../../utils");
// const {validateToken} = require("../../../middlewares");

class UserService {
  async signUp(data){
    try{
      if(!data.email || !data.password || !data.username || !data.user_type ){
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
        message : "User Registered Successfully",
        data : userDetails.user_id
      }
    }catch(error){
      throw new APIError(error.message, StatusCodes.BAD_REQUEST)
    }
  }
  async submitProfile(data){
    try{
      if(
        !data.userId ||
        !data.user_name ||
        !data.fullname ||
        !data.blood_group 
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
				message: "User Profile Updated Successfully",
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
				email: data.email,
				x_auth_token: token
			};
			return {
				status: StatusCodes.OK,
				message: "User logged In Successfully",
				data: userData
			};
		} catch (error) {
			throw new APIError(error.message, error.status);
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
				// let link =`${config.apiUrl}/?q=${token}`
				let bufferObj = Buffer.from(token, "utf8");
				// Encode the Buffer as a base64 string
				let base64String = bufferObj.toString("base64");
				
				
				// let link =`${config.apiUrl}/user/reset-password/?q=${token}`
        		let link =`${config.apiUrl}/reset_password/${base64String}`
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
			throw new APIError(error.message, error.status);
		}
  }
  async getuserlist(options){
	try{
		const userDetails = UserDatabase.getuserlist(options);
		if (Object.keys(userDetails).length === 0) {
			throw new APIError(message.noData, StatusCodes.NOT_FOUND);
		}
		return {
			status : StatusCodes.OK,
			message : "Success",
			data : userDetails
		}

	}catch(error){
		throw new APIError(error.message, error.status)
	}
  }
  async getUserById(userId){
	try{
		const userDetails =await UserDatabase.getUser({user_id : userId});
		console.log(userDetails );
		if (Object.keys(userDetails).length == 0) {
			throw new APIError(message.noData, StatusCodes.NOT_FOUND);
		}
		return {
			status : StatusCodes.OK,
			message : "Success",
			data : userDetails
		}

	}catch(error){
		throw new APIError(error.message, error.status)
	}
  }
  async resetPassword(data) {
		try {
			console.log(data);
			if (
				!data.password ||
				!data.token
			) {
				throw new APIError(message.badRequest, StatusCodes.BAD_REQUEST);
			}
			let bufferObj1 = Buffer.from(data.token, "base64");

			// Encode the Buffer as a utf8 string
			let decodedString = bufferObj1.toString("utf8");
			
			const user = await verifyToken(decodedString);
			
			const userDetails = await UserDatabase.getUser({ email: user.email });
			if (Object.keys(userDetails).length === 0) {
				throw new APIError(message.noData, StatusCodes.NOT_FOUND);
			}

			data.userId = userDetails.user_id;
			data.password = data.password;
			data.action = "password";
			await UserDatabase.submitProfile(data);

			return {
				status: StatusCodes.OK,
				message: "Password reset successfully",
				data: {
					role_id: userDetails.role_id
				}
			};
		} catch (error) {
			throw new APIError(error.message, error.status);
		}
	}

	async emergencyBlood(data)
	{
		try{
			if( 
				!data.name ||
				!data.email ||
				!data.blood_group ||
				!data.city
			)
			throw new APIError(message.badRequest, StatusCodes.BAD_REQUEST);
			// console.log(userDetails );
			

			const details = await UserDatabase.emergencyBlood(data);
				let emailBody = "<h1>Hey user you are craeted request for Blood</h1>";

			await sendEmail(data.email, message.successmail, emailBody);
			return {
				status: StatusCodes.OK,
				message: "blood request sent succesfully",
				data: {
					
				}
			};
		}
		catch (error) {
			throw new APIError(error.message, error.status);
		}
	}

}
module.exports = new UserService();
