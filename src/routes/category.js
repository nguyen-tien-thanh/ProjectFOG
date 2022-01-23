const express = require('express');
const router = express.Router();

const categoryController = require('../Controllers/CategoryController');

// [GET] /category/create category
router.use('/create', categoryController.create)

// // [POST] /categories/store category
router.post('/store', categoryController.store)

// [link bien dong] /category/show || /category/:slug
router.use('/:slug', categoryController.show)

// /category/index - category.hbs
router.use('/', categoryController.index)



module.exports = router;
