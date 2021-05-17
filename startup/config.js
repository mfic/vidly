const config = require('config');

module.exports = function () {
    if (!config) {
        throw new Error('FATAL ERROR: Config not loaded.');
    }
}