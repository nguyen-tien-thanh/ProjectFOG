const express = require('express');
const router = express.Router();

const userController = require('../Controllers/UserController');

// [POST] /category/handle-form-actions category
router.post('/handle-form-actions', userController.handleFormActions)

// [GET] /category/create category
router.use('/create', userController.create)

// [GET] /category/trash category
router.use('/trash', userController.trash)

// [GET] /category/create category
router.use('/manage', userController.manage)

// [GET] /category/:id/edit category
router.get('/:id/edit', userController.edit)

// [PUT] /category/:id/update category
router.put('/:id', userController.update)

// [PATCH] /category/:id/update category
router.patch('/:id/restore', userController.restore)

// [DELETE] /category/:id/detele category
router.delete('/:id', userController.delete)
router.delete('/:id/force', userController.force)

// // [POST] /categories/store category
router.post('/store', userController.store)

// [link bien dong] /category/show || /category/:slug
router.use('/:slug', userController.show)

// /category/index - category.hbs
router.use('/', userController.index)



module.exports = router;
