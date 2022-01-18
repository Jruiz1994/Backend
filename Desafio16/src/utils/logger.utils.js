import winston from 'winston';

const prodLogger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
})

const devLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(winston.format.simple())
        }),
        new winston.transports.Console({
            level: 'error',
            format: winston.format.combine(winston.format.simple())
        }),
        new winston.transports.Console({
            level: 'warn',
            format: winston.format.combine(winston.format.simple())
        }),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            format: winston.format.combine(winston.format.simple())
        }),
        new winston.transports.File({
            filename: 'warn.log',
            level: 'warn',
            format: winston.format.combine(winston.format.simple())
        })
    ]
})

const dev = process.env.NODE_ENV == 'development';
const logger = dev ? devLogger : prodLogger;

export default logger