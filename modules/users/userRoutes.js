var express = require('express');
const {getUsers, followUser, unfollowUser, getUser, updateUser,blockUser, createUser, createTestUsers, deleteUser,
    blockUserAsUser
} = require("./userController");
const {isAdmin, isAuth} = require("../../middleware/authMiddleware");
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
router.delete('/:id', deleteUser);

// /* GET single user. */
router.get('/profile/:id', getUser);

/* PUT update user. */
router.put('/:id', isAdmin, updateUser);

/* PUT Block user. */
router.put('/blockAsAdmin/:id', isAdmin,  blockUser);

/* PUT Block user. */
router.put('/blockAsUser/:id', isAuth,  blockUserAsUser);

/* GET follow user. */
router.get('/follow/:id', followUser)

/* GET unfollow user. */
router.get('/unfollow/:id', unfollowUser);

module.exports = router;