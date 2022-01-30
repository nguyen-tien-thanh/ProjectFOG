const express = require('express');
const router = express.Router();

const eventController = require('../Controllers/EventController');

// [POST] /category/handle-form-actions category
router.post('/handle-form-actions', eventController.handleFormActions)

// [GET] /category/create category
router.use('/create', eventController.create)

// [GET] /category/trash category
router.use('/trash', eventController.trash)

// [GET] /category/create category
router.use('/manage', eventController.manage)

// [GET] /category/:id/edit category
router.get('/:id/edit', eventController.edit)

// [PUT] /category/:id/update category
router.put('/:id', eventController.update)

// [PATCH] /category/:id/update category
router.patch('/:id/restore', eventController.restore)

// [DELETE] /category/:id/detele category
router.delete('/:id', eventController.delete)
router.delete('/:id/force', eventController.force)

// // [POST] /categories/store category
router.post('/store', eventController.store)

// [link bien dong] /category/show || /category/:slug
router.use('/:slug', eventController.show)

// /category/index - category.hbs
router.use('/', eventController.index)



module.exports = router;
