var express = require('express');
const {getUsers, getConnectedUser, register, getUser, login} = require("./userController");
const router = express.Router();
const isAuth = require('../../middleware/authMiddleware');

//CRUD
/* GET users listing. */
router.get('/', getUsers);



/* POST login user. */
router.post('/login', login)

/* POST register user. */
router.post('/register', register)

/* POST login user. */
router.get('/me', isAuth, getConnectedUser)

// /* GET single user. */
router.get('/:id', getUser);

// /* DELETE delete user. */
// router.delete('/:id', function(req, res, next) {
//   res.send('respond with a resource');
// })
// /* PUT update user. */
// router.put('/:id', function(req, res, next) {
//   res.send('respond with a resource');
// })
//
//
// /* POST logout user. */
// router.post('/logout', function(req, res, next) {
//   res.send('respond with a resource');
// })
// /* POST forgot password user. */
// router.post('/forgot-password', function(req, res, next) {
//   res.send('respond with a resource');
// })
//
// /* POST reset password user. */
// router.post('/reset-password', function(req, res, next) {
//   res.send('respond with a resource');
// })

module.exports = router;