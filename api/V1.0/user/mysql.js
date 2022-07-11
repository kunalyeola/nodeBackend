const { StatusCodes } = require("http-status-codes");
const APIError = require("../../../helpers/api-error");
const  mysqlConnection = require("../../../helpers/database");

class UserDatabase {
    async SignUp (info) {
        try {
            const sqlProcedutrCall = "call signUp(?, ?, ?, ?)";
            console.log("In the ")
            const userDetails = await mysqlConnection(sqlProcedutrCall,[
                info.email,
                info.password,
                info.username,
                info.role_id = 1
            ]);
            
            // console.log(userDetails);
            return userDetails[0][0];
        } catch (error) {
            throw new APIError(error.message , StatusCodes.BAD_REQUEST);
        }
    }
    async submitProfile(info){
        try {
            const sqlProcedutrCall = "call submitProfile(?, ?)";
            console.log("In the ")
            const userDetails = await mysqlConnection(sqlProcedutrCall,[
                typeof info.user_id !== "undefined" && info.user_id ? info.user_id : null,
                typeof info.action !== "undefined" && info.action ? info.action : '',
                typeof info.username !== "undefined" && info.username ? info.username : '',
                typeof info.fullname !== "undefined" && info.fullname ? info.fullname : '',
                typeof info.bloodgruop !== "undefined" && info.bloodgruop ? info.bloodgruop : '',
                typeof info.password !== "undefined" && info.password ? info.password : '',
                                
            ]);
            
            console.log(userDetails);
            let user = {};
			if (typeof userDetails !== "undefined" && typeof userDetails[0] !== "undefined" && typeof userDetails[0][0] !== "undefined") {
				user = userDetails[0][0];
			}
			return user;
        } catch (error) {
            throw new APIError(error.message , StatusCodes.BAD_REQUEST);
        }
    }
    async getUser(info){
        try {
            const sqlProcedureCall = "call getUser(?, ?)";
            console.log("In the ")
            const userDetails = await mysqlConnection(sqlProcedureCall,[
                typeof info.user_id !== "undefined" && info.user_id ? info.user_id : null,
                info.email,
                
            ]);
            
            console.log(userDetails);
            let user = {};
			if (typeof userDetails !== "undefined" && typeof userDetails[0] !== "undefined" && typeof userDetails[0][0] !== "undefined") {
				user = userDetails[0][0];
			}
			return user;
        } catch (error) {
            throw new APIError(error.message , StatusCodes.BAD_REQUEST);
        }
    }
}

module.exports = new UserDatabase();