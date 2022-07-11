const path = require("path");

module.exports = {
  rootDir: path.resolve(__dirname),
  apiHost : process.env.API_HOST,
  apiUrl : process.env.API_URL,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbUser: process.env.DB_USERNAME,
  dbPort: process.env.DB_PORT,
  jwtPrivateKet: process.env.JWT_SECRET_KEY,
  SMTPPassword: process.env.SMTP_PASSWORD,
  SMTPEmail : process.env.SMTP_EMAIL,
  SMTPPassword : process.env.SMTP_PASSWORD,
  SMTPFromName : process.env.SMTP_FROMNAME,
  SMTPHost : process.env.SMTP_HOST
};
