import winston from 'winston';
import path from 'path';

class Logger {
  logger = null;

  constructor() {
    this.logger = new (winston.Logger)({});
  }

  configure(userDataPath) {
    const logPath = path.normalize(path.join(userDataPath, 'notekeeper-client.log'));
    const transports = [
      new (winston.transports.File)({ filename: logPath })
    ];
    if (process.env.NODE_ENV === 'development') {
      transports.push(new (winston.transports.Console)());
    }
    this.logger.configure({
      transports
    });
  }

  debug(msg) {
    this.logger.debug(msg);
  }

  error(msg) {
    this.logger.error(msg);
  }
}

const logger = new Logger();

export default logger;
