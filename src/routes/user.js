const express = require('express');
const router = express.Router();

const { isLoggedIn, isManager, isAdmin, isQAC } = require('../ulti/authonize')

const userController = require('../Controllers/UserController');

// [POST] /category/handle-form-actions category
router.post('/handle-form-actions', isAdmin, userController.handleFormActions)

// [GET] /category/trash category
router.use('/trash', isAdmin, userController.trash)

// [GET] /category/create category
router.use('/manage', isAdmin, userController.manage)

// [GET] /category/:id/edit category
router.get('/:id/edit', userController.edit)

// [PUT] /category/:id/update category
router.put('/:id', userController.update)

// [PATCH] /category/:id/update category
router.patch('/:id/restore', isAdmin, userController.restore)

// [DELETE] /category/:id/detele category
router.delete('/:id', isAdmin, userController.delete)
router.delete('/:id/force', isAdmin, userController.force)

// // [POST] /categories/store category
router.post('/store', isAdmin, userController.store)

// [link bien dong] /category/show || /category/:slug
router.use('/:slug', userController.show)

// /category/index - category.hbs
router.use('/',isAdmin, userController.index)



module.exports = router;
