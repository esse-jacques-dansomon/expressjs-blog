// middleware/authMiddleware.js

const utils = require('../utils/auth');
function isAuth(req, res, next) {
    const token = utils.getToken(req);
    const isVerified = utils.verifyToken(token);
    if (!isVerified) return res.status(401).json({ error: 'Invalid token' });
    const decoded = utils.decodeToken(token);
    req.userId = decoded.id;
    next();
}

module.exports = isAuth;