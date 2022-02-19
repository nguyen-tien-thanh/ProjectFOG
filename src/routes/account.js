const express = require('express');
const router = express.Router();

const accountController = require('../Controllers/AccountController');

// [POST] /category/handle-form-actions category
router.post('/handle-form-actions', accountController.handleFormActions)

// [GET] /category/create category
router.use('/create', accountController.create)

// [GET] /category/trash category
router.use('/trash', accountController.trash)

// [GET] /category/create category
router.use('/manage', accountController.manage)

// [GET] /category/:id/edit category
router.get('/:id/edit', accountController.edit)

// [PUT] /category/:id/update category
router.put('/:id', accountController.update)

// [PATCH] /category/:id/update category
router.patch('/:id/restore', accountController.restore)

// [DELETE] /category/:id/detele category
router.delete('/:id', accountController.delete)
router.delete('/:id/force', accountController.force)

// // [POST] /categories/store category
router.post('/store', accountController.store)

// [link bien dong] /category/show || /category/:slug
router.use('/:slug', accountController.show)

// /category/index - category.hbs
router.use('/', accountController.index)



module.exports = router;
