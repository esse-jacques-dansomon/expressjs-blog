const express = require('express');
const {likeArticle, dislikeArticle, createArticle, getAllArticles, getArticle, updateArticle, deleteArticle} = require("./articleController");
const router = express.Router();

//CRUD

/* GET articles listing. */
router.get('/', getAllArticles);

/* GET single article. */
router.get('/:id', getArticle);

/* POST create article. */
router.post('/', createArticle)

/* PUT update article. */
router.put('/:id', updateArticle)

/* DELETE delete article. */
router.delete('/:id', deleteArticle)

/* GET Like/Unlike article. */
router.get('/like/:id', likeArticle)

/* GET Dislike/UnDislike article. */
router.get('/dislike/:id', dislikeArticle)

module.exports = router;