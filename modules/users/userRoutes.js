var express = require('express');
const {getUsers, getConnectedUser, register, getUser, login, logout, forgotPassword, resetPassword, updateUser} = require("./userController");
const router = express.Router();
const isAuth = require('../../middleware/authMiddleware');

//CRUD
/* GET users listing. */
router.get('/', getUsers);

// /* GET single user. */
router.get('/profile/:id', getUser);

/* PUT update user. */
router.put('/:id', isAuth, updateUser);

module.exports = router;