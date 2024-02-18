const express = require('express');
const {likeArticle, dislikeArticle, createArticle, getAllArticles, getArticle, updateArticle, deleteArticle,
    getAllMyArticles
} = require("./articleController");
const {isAuth, isUser} = require("../../middleware/authMiddleware");
const router = express.Router();

//CRUD

/* GET articles listing. */
router.get('/', getAllArticles);


/* POST create article. */
router.get('/myArticles',isAuth,isUser, getAllMyArticles);

/* GET single article. */
router.get('/details/:id', getArticle);

router.post('/', isAuth,isUser, createArticle)

/* PUT update article. */
router.put('/:id',isAuth,isUser, updateArticle)

/* DELETE delete article. */
router.delete('/:id',isAuth,isUser, deleteArticle)

/* GET Like/Unlike article. */
router.get('/like/:id', isAuth,isUser, likeArticle)

/* GET Dislike/UnDislike article. */
router.get('/dislike/:id',isAuth,isUser, dislikeArticle)

module.exports = router;