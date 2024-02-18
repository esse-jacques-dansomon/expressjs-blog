var express = require('express');
const {getUsers, followUser, unfollowUser, getUser, updateUser} = require("./userController");
const router = express.Router();
// const isAuth = require('../../middleware/authMiddleware');

//CRUD
/* GET users listing. */
router.get('/', getUsers);

// /* GET single user. */
router.get('/profile/:id', getUser);

/* PUT update user. */
router.put('/:id', updateUser);

/* GET follow user. */
router.get('/follow/:id', followUser)

/* GET unfollow user. */
router.get('/unfollow/:id', unfollowUser);

module.exports = router;