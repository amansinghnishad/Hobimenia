import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { combine, timestamp, json, errors, colorize, printf, splat } = winston.format;

// Determine if we are in production
const isProduction = process.env.NODE_ENV === 'production';

// Custom format for console logging with colors
const consoleFormat = combine(
  colorize(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  splat(), // Necessary to interpolate arguments into the log message
  printf(({ timestamp, level, message, ...meta }) => {
    let log = `${timestamp} [${level}]: ${message}`;
    if (meta && Object.keys(meta).length) {
      // If meta contains an error stack, print it nicely
      if (meta.stack) {
        log += `\n${meta.stack}`;
        delete meta.stack; // Avoid duplicating stack in JSON part
      }
      // Append remaining meta data as a formatted JSON string if not empty
      const metaString = JSON.stringify(meta, null, 2);
      if (metaString !== '{}') {
        log += ` ${metaString}`;
      }
    }
    return log;
  })
);

// JSON format for file logging
const fileJsonFormat = combine(
  timestamp(),
  errors({ stack: true }),
  json()
);

const transports = [];

// Console transport for all environments (with different formats)
if (!isProduction) {
  transports.push(
    new winston.transports.Console({
      format: consoleFormat,
      level: 'debug',
    })
  );
} else {
  transports.push(
    new winston.transports.Console({
      format: fileJsonFormat,
      level: 'info',
    })
  );
}

// File transports for production
if (isProduction) {
  transports.push(
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'error.log'),
      level: 'error',
      format: fileJsonFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true,
    })
  );
  transports.push(
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'combined.log'),
      level: 'info',
      format: fileJsonFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true,
    })
  );
} else {
  // Optional: File transport for development (debug level)
  transports.push(
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'dev-debug.log'),
      level: 'debug',
      format: fileJsonFormat,
      maxsize: 5242880,
      maxFiles: 1,
      tailable: true,
    })
  );
  transports.push(
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'dev-error.log'),
      level: 'error',
      format: fileJsonFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 1,
      tailable: true,
    })
  );
}

const logger = winston.createLogger({
  level: isProduction ? 'info' : 'debug',
  format: fileJsonFormat,
  transports: transports,
  exitOnError: false,
});

// Stream for Morgan
logger.stream = {
  write: (message) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

export default logger;
