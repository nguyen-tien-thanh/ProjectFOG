const express = require('express');
const router = express.Router();

const ideaController = require('../Controllers/IdeaController');

// [POST] /category/handle-form-actions category
router.post('/handle-form-actions', ideaController.handleFormActions)

// [GET] /category/create category
router.use('/create', ideaController.create)

// [GET] /category/trash category
router.use('/trash', ideaController.trash)

// [GET] /category/create category
router.use('/manage', ideaController.manage)

// [GET] /category/:id/edit category
router.get('/:id/edit', ideaController.edit)

// [PUT] /category/:id/update category
router.put('/:id', ideaController.update)

// [PATCH] /category/:id/update category
router.patch('/:id/restore', ideaController.restore)

// [DELETE] /category/:id/detele category
router.delete('/:id', ideaController.delete)
router.delete('/:id/force', ideaController.force)

// // [POST] /categories/store category
router.post('/store', ideaController.store)

// [link bien dong] /category/show || /category/:slug
router.use('/:slug', ideaController.show)

// /category/index - category.hbs
router.use('/', ideaController.index)



module.exports = router;
