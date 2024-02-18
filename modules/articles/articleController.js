const User = require("../users/User");
const Article = require("./Article");

const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        if (!articles) {
            return res.status(404).json({error: 'No articles found'});
        }
        res.status(200).json({
            message: 'Articles found',
            data: articles
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error', message: error.message});
    }
}

const getArticle = async (req, res) => {
    try {
        const id = req.params.id;

        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({error: 'Article not found'});
        }

        res.status(200).json({
            message: 'Article found',
            data: article
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error', message: error.message});
    }

}

const createArticle = async (req, res) => {
    try {
        const { titre, description, category, image } = req.body;
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        const article = new Article({
            titre,
            description,
            category,
            image,
            user: user._id
        });
        await article.save();
        user.articles.push(article._id);
        await user.save();
        res.status(201).json({
            message: 'Article created',
            data: article
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error', message: error.message});
    }
}

const updateArticle = async (req, res) => {

}

const deleteArticle = async (req, res) => {

}

const likeArticle = async (req, res) => {
    // 1. Get the article to like
    const id = req.params.id;
    const articleToLike = await Article .findById(id);
    if (!articleToLike) {
        return res.status(404).json({error: 'Article not found'});
    }
    // 2. Get the user that wants to like
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }
    // 3. Check if the user has already liked the article
    if (user.likes.includes(id)) {
        // remove the like
        user.likes.pull(articleToLike._id);
        await user.save();
        return res.status(200).json({
            message: 'Article unliked',
            data: user
        });
    }else {
        // 4. Like the article
        user.likes.push(articleToLike._id);
        await user.save();
        res.status(200).json({
            message: 'Article liked',
            data: user
        });
    }
}

const dislikeArticle = async (req, res) => {
    // 1. Get the article to dislike
    const id = req.params.id;
    const articleToDislike = await Article
        .findById(id);
    if (!articleToDislike) {
        return res.status(404).json({error: 'Article not found'});
    }
    // 2. Get the user that wants to dislike
    const user
        = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }
    // 3. Check if the user has already disliked the article
    if (user.dislikes.includes(id)) {
        // remove the dislike
        user.dislikes.pull(articleToDislike._id);
        await user.save();
        return res.status(200).json({
            message: 'Article undisliked',
            data: articleToDislike
        });
    }else {
        // 4. Dislike the article
        user.dislikes.push(articleToDislike._id);
        await user.save();
        res.status(200).json({
            message: 'Article disliked',
            data: articleToDislike
        });
    }

}



module.exports = {
    likeArticle,
    dislikeArticle,
    getAllArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle
}