const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;
const options = {expiresIn: process.env.TOKEN_EXPIRATION_TIME};

const generateToken = (payload) => {
    return jwt.sign({id : payload}, secret, options);
}

const verifyToken = (token) => {
    try {
        jwt.verify(token, secret);
    } catch (error) {
        return false;
    }
}

const decodeToken = (token) => {
    return jwt.decode(token);
}


const getToken = (req) => {
    return req.header('Authorization');
}



module.exports = {generateToken, verifyToken, decodeToken, getToken};