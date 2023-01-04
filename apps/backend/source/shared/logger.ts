import winston from 'winston';
import { NODE_ENV, LOG_FILE, Environment } from './consts.js';

export const enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  VERBOSE = 'verbose',
  DEBUG = 'debug',
}

export const logConfiguration = {
  transports: [
    new winston.transports.Console({
      level:
        NODE_ENV === Environment.PRODUCTION
          ? LogLevel.WARN
          : NODE_ENV === Environment.TESTING
          ? LogLevel.INFO
          : LogLevel.DEBUG,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.json(),
        winston.format.colorize({ all: true }),
      ),
    }),
    new winston.transports.File({
      filename: LOG_FILE,
      level:
        NODE_ENV === Environment.PRODUCTION
          ? LogLevel.WARN
          : NODE_ENV === Environment.TESTING
          ? LogLevel.INFO
          : LogLevel.DEBUG,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.json(),
        winston.format.colorize({ all: true }),
      ),
    }),
  ],
};

export const expressLogConfiguration = {
  ...logConfiguration,
  meta: NODE_ENV !== Environment.PRODUCTION,
  message: 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
  expressFormat: false,
  colorize: true,
};

export const logger = winston.createLogger(logConfiguration);

// export class LoggerService {
//   public logger: any = null;
//   constructor() {
//     this.logger = winston.createLogger(logConfiguration);
//   }
// }

// export const logger = new LoggerService().logger;
