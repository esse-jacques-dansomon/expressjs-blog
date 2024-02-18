const express = require('express');
const {getAllCategories, getCategory, createCategory, updateCategory, deleteCategory} = require("./categoryController");
const {isAuth, isUser} = require("../../middleware/authMiddleware");
const router = express.Router();

//CRUD

/* GET categories listing. */
router.get('/', getAllCategories);

/* GET single category. */
router.get('/details/:id', getCategory);

/* POST create category. */
router.post('/', isAuth, isUser, createCategory)

/* POST create category. */
router.get('/myCategories', isAuth, isUser, getAllCategories)

/* PUT update category. */
router.put('/:id',isAuth, isUser, updateCategory)

/* DELETE delete category. */
router.delete('/:id',isAuth, isUser, deleteCategory)

module.exports = router;