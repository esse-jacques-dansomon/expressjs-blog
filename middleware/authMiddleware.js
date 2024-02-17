// middleware/authMiddleware.js
const utils = require('../utils/auth');
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    console.log("token", token)
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = utils.verifyToken(token);
        console.log("decoded", decoded)
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;