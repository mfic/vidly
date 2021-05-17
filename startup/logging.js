const winston = require('winston');
require('winston-mongodb');
const config = require('config');

module.exports = function () {
    winston.exceptions.handle(
        new winston.transports.File({ filename: './log/unhandled.log' })
    );

    process.on('unhandledRejection', (err) => {
        throw err;
    });

    winston.add(new winston.transports.File({ filename: './log/logfile.log' }));
    // winston.add(new winston.transports.MongoDB({ db: config.mongodbUri }));
}