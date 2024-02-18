// middleware/authMiddleware.js

const utils = require('../utils/auth');
const User = require("../modules/users/User");
async function isAuth(req, res) {
    const token = utils.getToken(req);
    const isVerified = utils.verifyToken(token);
    if (!isVerified) return res.status(401).json({error: 'Invalid token'});
    const decoded = utils.decodeToken(token);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({error: 'User not found'});
    req.userId = decoded.id;
    req.user = {
        id: user._id,
        fistName: user.fistName,
        name: user.name,
        email: user.email,
        active: user.active,
        role: user.role
    };
    next();
}

module.exports = isAuth;