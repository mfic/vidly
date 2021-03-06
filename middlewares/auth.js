const config = require('config');
const jwt = require('jsonwebtoken');
const winston = require('winston');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, config.jwtPrivateKey);
        req.user = decoded;
        next();
    } catch (err) {
        winston.error(err.message);
        res.status(400).send('Invalid Token.')
    }
}