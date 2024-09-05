const jwt = require('jsonwebtoken');
const logger = require('../logger');

exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        logger.warn('No token provided');
        return res.sendStatus(401);
    }
    jwt.verify(token, 'SECRET_KEY', (err, user) => {
        if (err) {
            logger.error('Invalid token');
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};
