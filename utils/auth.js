const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;
const options = {expiresIn: process.env.TOKEN_EXPIRATION_TIME};

const generateToken = (payload) => {
    return jwt.sign({id : payload}, secret, options);
}

const verifyToken = (token) => {
    return jwt.verify(token, secret);
}

module.exports = {generateToken, verifyToken};