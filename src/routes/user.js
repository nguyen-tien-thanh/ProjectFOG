const express = require('express');
const router = express.Router();

const { isLoggedIn, authRole } = require('../ulti/authonize')
const {ROLE} = require('../models/Role')

const userController = require('../Controllers/UserController');

// [POST] /category/handle-form-actions category
router.post('/handle-form-actions', authRole(ROLE.ADMIN), userController.handleFormActions)

// [GET] /category/trash category
router.use('/trash', authRole(ROLE.ADMIN), userController.trash)

// [GET] /category/create category
router.use('/manage', authRole(ROLE.ADMIN), userController.manage)

// [GET] /category/:id/edit category
router.get('/:id/edit', userController.edit)

// [PUT] /category/:id/update category
router.put('/:id', userController.update)

// [PATCH] /category/:id/update category
router.patch('/:id/restore', authRole(ROLE.ADMIN), userController.restore)

// [DELETE] /category/:id/detele category
router.delete('/:id', authRole(ROLE.ADMIN), userController.delete)
router.delete('/:id/force', authRole(ROLE.ADMIN), userController.force)

// // [POST] /categories/store category
router.post('/store', userController.store)

// [link bien dong] /category/show || /category/:slug
router.use('/:slug', userController.show)

// /category/index - category.hbs
router.use('/',authRole(ROLE.ADMIN), userController.index)



module.exports = router;
