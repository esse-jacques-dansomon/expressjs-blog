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
    req.user = {
        id: user._id,
        email: user.email,
        role: user.role,
        isBlocked: user.isBlocked,
        active: user.active
    }
    next();
}

async function isAdmin(req, res, next) {
    // 1- Get the userId the request header
    const id = req.userId
    // 2- Get the user from the database
    const user = await User.findById(id);
    // 3- Check if the user exists
    if (!user) return res.status(404).json({error: 'User not found'});
    // 4- Check if the user is an admin
    if (!(user.role === 'Admin')) return res.status(403).json({error: 'Not authorized'});
    next();
}

async function isUser(req, res, next) {
    // 1- Get userId from the request
    const id = req.userId
    const user = await User.findById(id);
    if (!user) return res.status(404).json({error: 'User not found'});
    // 4- Check if the user role is admin
    if (!(user.role === 'User')) return res.status(403).json({error: 'Not authorized'});
    next();

}

async function isBlocked(req, res, next) {
    // 1- Get userId from the request
    const id = req.userId
    const user = await User .findById(id);
    if (!user) return res.status(404).json({error: 'User not found'});
    // 4- Check if the user is blocked
    if (user.isBlocked) return res.status(403).json({error: 'Not authorized'});
    next();
}


module.exports = {
    isAuth,
    isAdmin,
    isUser,
    isBlocked
};