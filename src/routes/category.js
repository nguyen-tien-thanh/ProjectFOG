const express = require('express');
const router = express.Router();

const categoryController = require('../Controllers/CategoryController');

// [POST] /category/handle-form-actions category
router.post('/handle-form-actions', categoryController.handleFormActions)

// [GET] /category/create category
router.use('/create', categoryController.create)

// [GET] /category/:id/edit category
router.get('/:id/edit', categoryController.edit)

// [PUT] /category/:id/update category
router.put('/:id', categoryController.update)

// [PATCH] /category/:id/update category
router.patch('/:id/restore', categoryController.restore)

// [DELETE] /category/:id/detele category
router.delete('/:id', categoryController.delete)
router.delete('/:id/force', categoryController.force)

// // [POST] /categories/store category
router.post('/store', categoryController.store)

// [link bien dong] /category/show || /category/:slug
router.use('/:slug', categoryController.show)

// /category/index - category.hbs
router.use('/', categoryController.index)



module.exports = router;
