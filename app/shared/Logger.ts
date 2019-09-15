import winston from 'winston';
import path from 'path';

class Logger {
  logger: winston.Logger = null;

  /*
  constructor() {
  }
  */

  configure(userDataPath): winston.Logger {
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

  debug(msg: string): void {
    if (window.Bridge) {
      window.Bridge.logger.debug(msg);
    } else {
      this.logger.debug(msg);
    }
  }

  info(msg: string): void {
    if (window.Bridge) {
      window.Bridge.logger.info(msg);
    } else {
      this.logger.info(msg);
    }
  }

  error(msg: string): void {
    if (window.Bridge) {
      window.Bridge.logger.error(msg);
    } else {
      this.logger.error(msg);
    }
  }
}

const logger = new Logger();

export default logger;
