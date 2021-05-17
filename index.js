require('express-async-errors');
const config = require('config');
const express = require('express');
const winston = require('winston/lib/winston/config');
const app = express();
require('./startup/logging')();
require('./startup/database')();
require('./startup/routes')(app);

if (!config) {
    console.error('FATAL ERROR: Config not loaded.')
    process.exit(1);
}

const port = config.PORT;
app.listen(port, () => winston.info(`Listen on port ${port}`));
