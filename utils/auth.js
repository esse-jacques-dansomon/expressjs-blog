const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;
const options = {expiresIn: process.env.TOKEN_EXPIRATION_TIME};

const generateToken = (payload) => {
    return jwt.sign({id : payload}, secret, options);
}

const verifyToken = (token) => {
    console.log("token", token)
    return jwt.verify(token, secret);
}

const decodeToken = (token) => {
    return jwt.decode(token);
}



const getToken = (req) => {
    return req.header('auth-token');
}



module.exports = {generateToken, verifyToken, decodeToken, getToken};