const express = require('express');
const router = express.Router();

//CRUD
/* GET articles listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET single article. */
router.get('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST create article. */
router.post('/', function(req, res, next) {
    res.send('respond with a resource');
})

/* PUT update article. */
router.put('/:id', function(req, res, next) {
    res.send('respond with a resource');
})

/* DELETE delete article. */
router.delete('/:id', function(req, res, next) {
    res.send('respond with a resource');
})

module.exports = router;