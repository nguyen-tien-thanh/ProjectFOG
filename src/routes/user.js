const express = require('express');
const router = express.Router();

const { isLoggedIn, isManager, isAdmin, isQAC } = require('../ulti/authonize')

const userController = require('../Controllers/UserController');


// [GET] /user/create
router.get('/create', isAdmin, userController.create)

// [POST] /user/handle-form-actions user
router.post('/handle-form-actions', isAdmin, userController.handleFormActions)

// [GET] /user/trash user
router.use('/trash', isAdmin, userController.trash)

// [GET] /user/create user
router.use('/manage', isAdmin, userController.manage)

// [GET] /user/:id/changepassword user
router.get('/:id/changepassword', userController.changepassword)

// [POST] /user/:id/changepassword user
router.post('/:id/change', userController.change)

// [GET] /user/:id/edit user
router.get('/:id/edit', userController.edit)

// [PUT] /user/:id/update user
router.put('/:id', userController.update)

// [PATCH] /user/:id/update user
router.patch('/:id/restore', isAdmin, userController.restore)

// [DELETE] /user/:id/detele user
router.delete('/:id', isAdmin, userController.delete)
router.delete('/:id/force', isAdmin, userController.force)

// // [POST] /categories/store user
router.post('/store', isAdmin, userController.store)

// [link bien dong] /user/show || /user/:slug
router.use('/:slug', userController.show)

// /user/index - user.hbs
router.use('/',isAdmin, userController.index)



module.exports = router;
