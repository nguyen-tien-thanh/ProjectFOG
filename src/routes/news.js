const express = require('express');
const router = express.Router();

const { isLoggedIn, isManager, isAdmin, isQAC } = require('../ulti/authonize')

const newsController = require('../Controllers/NewsController');

// [POST] /news/handle-form-actions news
router.post('/handle-form-actions', isLoggedIn, isManager, newsController.handleFormActions)

// [GET] /news/create news
router.use('/create', isLoggedIn, isManager, newsController.create)

// [GET] /news/trash news
router.use('/trash', isLoggedIn, isManager, newsController.trash)

// [GET] /news/create news
router.use('/manage', isLoggedIn, isManager, newsController.manage)

// [GET] /news/:id/edit news
router.get('/:id/edit', isLoggedIn, isManager, newsController.edit)

// [PUT] /news/:id/update news
router.put('/:id', isLoggedIn, isManager, newsController.update)

// [PATCH] /news/:id/update news
router.patch('/:id/restore', isLoggedIn, isManager, newsController.restore)

// [DELETE] /news/:id/detele news
router.delete('/:id', isLoggedIn, isManager, newsController.delete)
router.delete('/:id/force', isLoggedIn, isAdmin, newsController.force)

// // [POST] /news/store news
router.post('/store', isLoggedIn, isManager, newsController.store)

// [link bien dong] /news/show || /news/:slug
router.use('/:slug', newsController.show)

// /news/index - news.hbs
router.use('/', newsController.index)



module.exports = router;
