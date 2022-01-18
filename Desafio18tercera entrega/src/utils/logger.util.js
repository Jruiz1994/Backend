import winston from 'winston';

const logger = winston.createLogger({
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
            filename: 'errores.log',
            level: 'error',
            format: winston.format.combine(winston.format.simple())
        }),
        new winston.transports.File({
            filename: 'errores.log',
            level: 'warn',
            format: winston.format.combine(winston.format.simple())
        })
    ]
})

export default logger