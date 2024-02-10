var express = require('express');
const {getUsers, getConnectedUser, register, getUser, login} = require("./userController");
const router = express.Router();
const verifyToken = require('../../middleware/authMiddleware');

//CRUD
/* GET users listing. */
router.get('/', getUsers);

/* GET single user. */
router.get('/:id', getUser);


/* PUT update user. */
router.put('/:id', function(req, res, next) {
  res.send('respond with a resource');
})

/* DELETE delete user. */
router.delete('/:id', function(req, res, next) {
  res.send('respond with a resource');
})

/* POST login user. */
router.post('/login', login)

/* POST logout user. */
router.post('/logout', function(req, res, next) {
  res.send('respond with a resource');
})

/* POST register user. */
router.post('/register', register)

/* POST login user. */
router.get('/me',verifyToken, getConnectedUser)

/* POST forgot password user. */
router.post('/forgot-password', function(req, res, next) {
  res.send('respond with a resource');
})

/* POST reset password user. */
router.post('/reset-password', function(req, res, next) {
  res.send('respond with a resource');
})

module.exports = router;