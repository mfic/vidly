const config = require('config');
const winston = require('winston');
const express = require('express')
const app = express();

require('./startup/logging')();
require('./startup/database')();
require('./startup/routes')(app);
require('./startup/config.js')();
require('./startup/validation')();

const port = config.PORT;
const server = app.listen(port, () => winston.info(`Listen on port ${port}`));

module.exports = server;