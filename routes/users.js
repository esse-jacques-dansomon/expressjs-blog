var express = require('express');
const router = express.Router();

//CRUD
/* GET users listing. */
/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET single user. */
router.get('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST create user. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
})

/* PUT update user. */
router.put('/:id', function(req, res, next) {
  res.send('respond with a resource');
})

/* DELETE delete user. */
router.delete('/:id', function(req, res, next) {
  res.send('respond with a resource');
})

/* POST login user. */
router.post('/login', function(req, res, next) {
  res.send('respond with a resource');
})

/* POST logout user. */
router.post('/logout', function(req, res, next) {
  res.send('respond with a resource');
})

/* POST register user. */
router.post('/register', function(req, res, next) {
  res.send('respond with a resource');
})

/* POST forgot password user. */
router.post('/forgot-password', function(req, res, next) {
  res.send('respond with a resource');
})

/* POST reset password user. */
router.post('/reset-password', function(req, res, next) {
  res.send('respond with a resource');
})



module.exports = router;