const express = require('express');
const router = express.Router();

const categoryController = require('../Controllers/CategoryController');

// [GET] /category/create category
router.use('/create', categoryController.create)

// [GET] /category/:id/edit category
router.get('/:id/edit', categoryController.edit)

// [PUT] /category/:id/update category
router.put('/:id', categoryController.update)

// [DELETE] /category/:id/detele category
router.delete('/:id', categoryController.delete)

// // [POST] /categories/store category
router.post('/store', categoryController.store)

// [link bien dong] /category/show || /category/:slug
router.use('/:slug', categoryController.show)

// /category/index - category.hbs
router.use('/', categoryController.index)



module.exports = router;
