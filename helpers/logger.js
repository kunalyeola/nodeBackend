const pinoExpress = require("express-pino-logger");
const pino = require("pino");

class Logger {
  constructor () {
    this.level = process.env.LOG_LEVEL;
  }

  serverLogger (error) {
    console.log(process.env.NODE_ENV);
    // let level1= process.env.LOG_LEVEL
    console.log(error.message);
    const logger = pino(
      {
        name: "server",
        level: this.level,
        formatters: {
          level (label) {
            return { level: label };
          }
        }
      },
      pino.destination(`./logs/server-${process.env.NODE_ENV}`)
    );
    logger.info(error.message);
  }

  expressLogger (error) {
    console.log(process.env.NODE_ENV);
    const da = pinoExpress(

      {
        name: "express",
        level: this.level,
        formatters: {
          level (label) {
            return { level: label };
          }
        }
      },
      pino.destination({ dest: `./logs/express-${process.env.NODE_ENV}`, sync: true })
    );
    da.info(error.message);
  }
};

module.exports = new Logger();
