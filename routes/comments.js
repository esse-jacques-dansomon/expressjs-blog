const express = require('express');
const router = express.Router();

//CRUD
/* GET comments listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET single comment. */
router.get('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST create comment. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
})

/* PUT update comment. */
router.put('/:id', function(req, res, next) {
  res.send('respond with a resource');
})

/* DELETE delete comment. */
router.delete('/:id', function(req, res, next) {
  res.send('respond with a resource');
})

module.exports = router;