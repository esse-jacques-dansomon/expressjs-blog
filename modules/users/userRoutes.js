var express = require('express');
const {getUsers, followUser, unfollowUser, getUser, updateUser,blockUser, createUser, createTestUsers, deleteUser,
    blockUserAsUser,getMyFollowers
} = require("./userController");
const {isAdmin, isAuth, isUser} = require("../../middleware/authMiddleware");
const router = express.Router();
// const isAuth = require('../../middleware/authMiddleware');

//CRUD
/* GET users listing. */
router.get('/', getUsers);

/* POST create admin. */
router.get( '/testUsers', createTestUsers);

/* POST create admin. */
router.post( '/createAdmin',isAdmin, createUser);

/* DELETE delete user. */
router.delete('/:id',isAdmin, deleteUser);

// /* GET single user. */
router.get('/profile/:id', isAuth, isUser, getUser);

/* PUT update user. */
router.put('/:id',isAuth, isAdmin, updateUser);

/* PUT Block user. */
router.put('/blockAsAdmin/:id',isAuth, isAdmin,  blockUser);

/* PUT Block user. */
router.put('/blockAsUser/:id', isAuth,isUser,  blockUserAsUser);

/* GET follow user. */
router.get('/follow/:id',isAuth,isUser, followUser)

/* GET unfollow user. */
router.get('/unfollow/:id',isAuth,isUser, unfollowUser);

/* GET unfollow user. */
router.get('/myFollowers',isAuth,isUser, getMyFollowers);

module.exports = router;