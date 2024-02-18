// middleware/authMiddleware.js

const utils = require('../utils/auth');
const User = require("../modules/users/User");
async function isAuth(req, res, next) {

    // 1- Get the token from the request header
    const token = utils.getToken(req);
    console.log('token',token);
    // 2- Verify the token
    const isVerified = utils.verifyToken(token);
    console.log('isVerified',isVerified)
    if (!isVerified) return res.status(401).json({error: 'Invalid token'});
    // 3- Get the user from the database and attach it to the request object
    const decoded = utils.decodeToken(token);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({error: 'User not found'});
    // 4- Attach the user to the request object
    req.userId = decoded.id;
    next();
}

module.exports = isAuth;