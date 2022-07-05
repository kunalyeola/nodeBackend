const config = require("../config");
const mysql = require("mysql");
// const util = require("util");

const connnectionPool = mysql.createPool({
  user: config.dbUser,
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPassword,
  port: config.dbPort,
  connectionLimit: 100
});
connnectionPool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }
  console.log("Successfully connected to Database :", config.dbName);

  if (connection) {
    connection.release();
  }
});

connnectionPool.getConnection(err => {
  if (err) {
    console.log(err);
    console.log("Error in connecting to Database");
    return;
  }
  console.log("Connection established");
});

// module.exports = util.promisify(con.query).bind(con);

module.exports = async (sqlQuery, arrayParams) => {
  return await new Promise((resolve, reject) => {
    connnectionPool.getConnection((err, connection) => {
      if (err) {
        console.log(err);

        console.log("Error in connecting to Database");

        reject(err);
      }

      if (connection) {
        connection.query(sqlQuery, arrayParams, (error, result) => {
          if (error) {
            // logger.error(err);

            // eslint-disable-next-line no-unused-expressions
            connection.release;

            reject(error);
          }

          connection.release();

          resolve(JSON.parse(JSON.stringify(result)));
        }

        );
      }
    });
  });
};

