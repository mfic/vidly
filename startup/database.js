const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');

module.exports = function () {
    mongoose.connect(config.db.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(() => winston.info('Connected to MonogoDB...'))
}