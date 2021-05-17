const config = require('config');
const express = require('express')
const winston = require('winston');
const app = express();
require('./startup/logging')();
require('./startup/database')();
require('./startup/routes')(app);
require('./startup/config.js')();
require('./startup/validation')();

const port = config.PORT;
app.listen(port, () => winston.info(`Listen on port ${port}`));
