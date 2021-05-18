const config = require('config');
const winston = require('winston');

module.exports = function(app){
	const port = config.PORT;
	app.listen(port, () => winston.info(`Listen on port ${port}`));
}