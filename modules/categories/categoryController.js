const Category = require('./Category');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('user', 'name');
        if (!categories) {
            return res.status(404).json({error: 'No categories found'});
        }
        res.status(200).json({
            message: 'Categories found',
            data: categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error', message: error.message});
    }
}

const getMyCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({user: req.userId});
        if (!categories) {
            return res.status(404).json({error: 'No categories found'});
        }
        res.status(200).json({
            message: 'Categories found',
            data: categories
        });
    } catch (error) {
        next(error);
    }

}

const getCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({error: 'Category not found'});
        }
        res.status(200).json({
            message: 'Category found',
            data: category
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error', message: error.message});
    }
}

const createCategory = async (req, res) => {
    try {
        const { title } = req.body;
        const
        category = new Category({
            title,
            user: req.userId
        });
        await category.save();
        res.status(201).json({
            message: 'Category created',
            data: category
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error', message: error.message});
    }

}

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const body = {title: req.body.title};
        //1-n verify is the user is the owner of the category
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({error: 'Category not found'});
        }
        if (category.user.toString() !== req.userId) {
            return res.status(401).json({error: 'Not authorized to update this category'});
        }

        //2- update the category
        const updatedCategory = await Category.findByIdAndUpdate
        (id, body, {new: true});
        if (!category) {
            return res.status(404).json({error: 'Category not found'});
        }
        res.status(200).json({
            message: 'Category updated',
            data: category
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error', message: error.message});
    }
}

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        // 1- find the user by id and verify it's it article
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({error: 'Category not found'});
        }
        if (category.user.toString() !== req.userId) {
            return res.status(401).json({error: 'Not authorized to delete this category'});
        }
        // 2- delete the article
        if (!category) {
            return res.status(404).json({error: 'Category not found'});
        }
        res.status(200).json({
            message: 'Category deleted',
            data: category
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error', message: error.message});
    }
}

module.exports = {
    getAllCategories,
    getMyCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
}