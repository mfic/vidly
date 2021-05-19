const express = require('express')
const app = express();

require('./startup/logging')();
require('./startup/database')();
require('./startup/routes')(app);
require('./startup/config.js')();
require('./startup/validation')();
require('./startup/server')(app);
