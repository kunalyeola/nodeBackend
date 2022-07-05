const path = require("path");

module.exports = {
  rootDir: path.resolve(__dirname),
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbUser: process.env.DB_USERNAME,
  dbPort: process.env.DB_PORT,
  jwtPrivateKet: process.env.JWT_SECRET_KEY
};
