import winston from 'winston';
import path from 'path';

class Logger {
  logger = null;

  constructor() {
  }

  configure(userDataPath) {
    const logPath = path.normalize(
      path.join(userDataPath, 'notekeeper-client.log')
    );

    const transports = [new winston.transports.File({ filename: logPath })];
    if (process.env.NODE_ENV === 'development') {
      transports.push(new winston.transports.Console());
    }

    this.logger = winston.createLogger({
      level: 'debug',
      transports
    });
    return this.logger;
  }

  debug(msg) {
    window.Bridge.logger.debug(msg);
  }

  info(msg) {
    window.Bridge.logger.info(msg);
  }

  error(msg) {
    window.Bridge.logger.error(msg);
  }
}

const logger = new Logger();

export default logger;
