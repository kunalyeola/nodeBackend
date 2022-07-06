const { StatusCodes } = require("http-status-codes");
const APIError = require("../../../helpers/api-error");
const  mysqlConnection = require("../../../helpers/database");

class UserDatabase {
    async SignUp (info) {
        try {
            const sqlProcedutrCall = "call signUp(?, ?, ?)";
            console.log("In the ")
            const userDetails = await mysqlConnection(sqlProcedutrCall,[
                info.email,
                info.password,
                info.role_id = 1
            ]);
            
            // console.log(userDetails);
            return userDetails[0][0];
        } catch (error) {
            throw new APIError(error.message , StatusCodes.BAD_REQUEST);
        }
    }
    async getUser(info){
        try {
            const sqlProcedutrCall = "call getUser(?, ?, ?)";
            console.log("In the ")
            const userDetails = await mysqlConnection(sqlProcedutrCall,[
                info.email,
                info.user_id
            ]);
            
            // console.log(userDetails);
            return userDetails[0][0];
        } catch (error) {
            throw new APIError(error.message , StatusCodes.BAD_REQUEST);
        }
    }
}

module.exports = new UserDatabase();