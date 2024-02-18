const User = require("../users/User");
const Article = require("./Article");
const Category = require("../categories/Category");

const getAllArticles = async (req, res) => {
    try {

        const articles = await Article.find(
        )

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

const getAllMyArticles = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const articles = await Article.find({user: user._id.toString()});
        if (!articles) {
            return res.status(404).json({error: 'No articles found'});
        }
        res.status(200).json({
            message: 'Articles found',
            data: articles
        });
    } catch (error) {
        next(error);
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

const createArticle = async (req, res, next) => {
    try {
        const {titre, description, category, image} = req.body;
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        const categoryObject = await Category.find({user: user._id, id: category});
        if (!categoryObject) {
            return res.status(404).json({error: 'Category not found'});
        }
        console.log('categoryObject', categoryObject, user._id.toString());
        // verify is it is his category
        // const isHisCategory = categoryObject.user.toString() === user._id.toString();
        //
        //  if (!isHisCategory) {
        //      return res.status(403).json({error: 'Not authorized'});
        //  }

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
        console.log(error);
        next(error);
    }
}

const updateArticle = async (req, res) => {
    try {
        const id = req.params.id;
        const body = {
            titre: req.body.titre,
            description: req.body.description,
            category: req.body.category,
            image: req.body.image
        };
        const article = await Article.findByIdAndUpdate(id, body, {new: true});
        // 1-n verify is the user is the owner of the article

        if (!article) {
            return res.status(404).json({error: 'Article not found'});
        }
        res.status(200).json({
            message: 'Article updated',
            data: article
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error', message: error.message});
    }
}

const deleteArticle = async (req, res) => {

}

const likeArticle = async (req, res) => {
    // 1. Get the article to like
    const id = req.params.id;
    const articleToLike = await Article.findById(id);
    if (!articleToLike) {
        return res.status(404).json({error: 'Article not found'});
    }
    // 2. Get the user that wants to like
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }

    console.log('articleToLike', articleToLike, 'user', user)
    // 3. Check if the article has already been liked by the user
    if (articleToLike.likes.includes(user._id.toString())) {
        // remove the like
        articleToLike.likes.pull(user._id);
        await articleToLike.save();
        return res.status(200).json({
            message: 'Article unliked',
            data: articleToLike
        });
    } else {
        // 4. Like the article
        articleToLike.likes.push(user._id);
        // if the user has already disliked the article, remove the dislike
        if (articleToLike.dislikes.includes(user._id.toString())) {
            articleToLike.dislikes.pull(user._id);
        }
        await articleToLike.save();
        res.status(200).json({
            message: 'Article liked',
            data: articleToLike
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
    if (articleToDislike.dislikes.includes(user._id.toString())) {
        // remove the dislike
        articleToDislike.dislikes.pull(user._id);
        await articleToDislike.save();
        return res.status(200).json({
            message: 'Article undisliked',
            data: articleToDislike
        });
    } else {
        // 4. Dislike the article
        articleToDislike.dislikes.push(user._id);
        // if the user has already liked the article, remove the like
        if (articleToDislike.likes.includes(user._id.toString())) {
            articleToDislike.likes.pull(user._id);
        }
        await articleToDislike.save();
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
    getAllMyArticles,
    createArticle,
    updateArticle,
    deleteArticle
}