const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const config = require('config');

module.exports = function () {
    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: './logs/unhandled.log' })
    );

    process.on('unhandledRejection', (err) => {
        throw err;
    });

    winston.add(new winston.transports.File({ filename: './logs/logfile.log' }));
    winston.add(new winston.transports.MongoDB({
        db: config.db.mongoUri,
        options: { useUnifiedTopology: true },
        metaKey: 'meta'
    }));
}