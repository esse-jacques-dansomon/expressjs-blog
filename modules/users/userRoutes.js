var express = require('express');
const {getUsers, createUser, register, getUser, login} = require("./userController");
const req = require("express/lib/request");
const router = express.Router();

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

/* POST forgot password user. */
router.post('/forgot-password', function(req, res, next) {
  res.send('respond with a resource');
})

/* POST reset password user. */
router.post('/reset-password', function(req, res, next) {
  res.send('respond with a resource');
})

module.exports = router;