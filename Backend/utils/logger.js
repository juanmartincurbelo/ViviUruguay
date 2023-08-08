const winston = require('winston');
const path = require('path');

const logsDirectory = path.join(__dirname, '..', 'Logs');

const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDirectory, 'error.log')
    })
  ]
});

const auditLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDirectory, 'audit.log')
    })
  ]
});

const eventLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDirectory, 'event.log')
    })
  ]
});

const applicationLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDirectory, 'application.log')
    })
  ]
});

const error = (message, metadata) => errorLogger.error(message, metadata);

const info = (message, metadata) => auditLogger.info(message, metadata);

const event = (message, metadata) => eventLogger.info(message, metadata);

const application = (message, metadata) => applicationLogger.info(message, metadata);

module.exports = {
  error,
  info,
  event,
  application,
};
