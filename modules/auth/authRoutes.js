var express = require('express');
const router = express.Router();
const {getConnectedUser, register, login, logout, forgotPassword, resetPassword} = require("./authController");
const {isAuth} = require("../../middleware/authMiddleware");

/* POST login user. */
router.post('/login', login)

/* POST register user. */
router.post('/register', register)

/* POST logout user. */
router.post('/logout', isAuth, logout)

/* POST forgot password user. */
router.post('/forgot-password', isAuth, forgotPassword)

/* POST reset password user. */
router.post('/reset-password', isAuth, resetPassword)

/* POST login user. */
router.get('/me', isAuth, getConnectedUser)

module.exports = router;