import winston from 'winston';
import environment from '../config/environment.js';
import customLevelsOptions from '../utils/customLevelsOptions.js';

 let logger = winston.createLogger({
        levels: customLevelsOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                    // winston.format.colorize({ colors: customLevelsOptions.colors }),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: './error.log',
                level: 'error',
                format: winston.format.simple()
            }),
        ],
    }
    );

if (environment.ENVIRONMENT === 'development') {
    console.log("ENVIRONMENT")


    logger = winston.createLogger({
        levels: customLevelsOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelsOptions.colors }),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: './combined.log',
                level: 'warn',
                format: winston.format.simple()
            }),
        ],
    });
} else {
    console.log("NO ENVIRONMENT")

    let logger = winston.createLogger({
        levels: customLevelsOptions.levels,

        transports: [
            // new winston.transports.Console({ level: 'verbose' }),
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelsOptions.colors }),
                    winston.format.simple()
                )
            }),
        ],
    });
    // let logger = winston.createLogger({
    //     levels: customLevelsOptions.levels,
    //     transports: [
    //         new winston.transports.Console({
    //             level: 'debug',
    //             format: winston.format.combine(
    //                 winston.format.colorize({ colors: customLevelsOptions.colors }),
    //                 winston.format.simple()
    //             )
    //         }),
    //         new winston.transports.File({
    //             filename: './combined.log',
    //             level: 'warn',
    //             format: winston.format.simple()
    //         }),
    //     ],
    // }
    // );
}

export const loggerMiddleware = (req, res, next) => {
    req.logger = logger;
    // logger.http(`${req.method} - ${req.url} - [${req.ip}] - ${req.get('user-agent')} - ${new Date().toISOString()}`);
    next();
}