const express = require('express');
const router = express.Router();

const newsController = require('../Controllers/NewsController');

// [POST] /category/handle-form-actions category
router.post('/handle-form-actions', newsController.handleFormActions)

// [GET] /category/create category
router.use('/create', newsController.create)

// [GET] /category/trash category
router.use('/trash', newsController.trash)

// [GET] /category/create category
router.use('/manage', newsController.manage)

// [GET] /category/:id/edit category
router.get('/:id/edit', newsController.edit)

// [PUT] /category/:id/update category
router.put('/:id', newsController.update)

// [PATCH] /category/:id/update category
router.patch('/:id/restore', newsController.restore)

// [DELETE] /category/:id/detele category
router.delete('/:id', newsController.delete)
router.delete('/:id/force', newsController.force)

// // [POST] /categories/store category
router.post('/store', newsController.store)

// [link bien dong] /category/show || /category/:slug
router.use('/:slug', newsController.show)

// /category/index - category.hbs
router.use('/', newsController.index)



module.exports = router;
