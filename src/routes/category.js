const express = require('express');
const router = express.Router();

const categoryController = require('../Controllers/CategoryController');

const { isLoggedIn, isManager, isAdmin, isQAC } = require('../ulti/authonize'); 

// [GET] /category/trash category
router.use('/trash', isAdmin, categoryController.trash)

// [GET] /category/create category
router.use('/manage', isManager, categoryController.manage)

// [POST] /category/handle-form-actions category
router.post('/handle-form-actions', isManager, categoryController.handleFormActions)

// [GET] /category/create category
router.use('/create', isManager, categoryController.create)

// [GET] /category/:id/edit category
router.get('/:id/edit', isManager, categoryController.edit)

// [PUT] /category/:id/update category
router.put('/:id', isManager, categoryController.update)

// [PATCH] /category/:id/update category
router.patch('/:id/restore', isManager, categoryController.restore)

// [DELETE] /category/:id/detele category
router.delete('/:id', isManager, categoryController.delete)
router.delete('/:id/force', isAdmin, categoryController.force)

// // [POST] /categories/store category
router.post('/store', isManager, categoryController.store)

// [link bien dong] /category/show || /category/:slug
router.use('/:slug', categoryController.show)

// /category/index - category.hbs
router.use('/', categoryController.index)


module.exports = router;
