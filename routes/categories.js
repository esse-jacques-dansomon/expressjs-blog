const express = require('express');
const router = express.Router();

//CRUD
/* GET categories listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET single category. */
router.get('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST create category. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
})

/* PUT update category. */
router.put('/:id', function(req, res, next) {
  res.send('respond with a resource');
})

/* DELETE delete category. */
router.delete('/:id', function(req, res, next) {
  res.send('respond with a resource');
})

module.exports = router;