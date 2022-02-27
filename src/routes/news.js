const express = require('express');
const router = express.Router();

const { isLoggedIn, authRole } = require('../ulti/authonize')
const {ROLE} = require('../models/Role')

const newsController = require('../Controllers/NewsController');

// [POST] /news/handle-form-actions news
router.post('/handle-form-actions', isLoggedIn, authRole(ROLE.ADMIN || ROLE.QAC), newsController.handleFormActions)

// [GET] /news/create news
router.use('/create', isLoggedIn, newsController.create)

// [GET] /news/trash news
router.use('/trash', isLoggedIn, authRole(ROLE.ADMIN || ROLE.QAC), newsController.trash)

// [GET] /news/create news
router.use('/manage', isLoggedIn, authRole(ROLE.ADMIN || ROLE.QAC), newsController.manage)

// [GET] /news/:id/edit news
router.get('/:id/edit', isLoggedIn, authRole(ROLE.ADMIN || ROLE.QAC), newsController.edit)

// [PUT] /news/:id/update news
router.put('/:id', isLoggedIn, authRole(ROLE.ADMIN || ROLE.QAC), newsController.update)

// [PATCH] /news/:id/update news
router.patch('/:id/restore', isLoggedIn, newsController.restore)

// [DELETE] /news/:id/detele news
router.delete('/:id', isLoggedIn, authRole(ROLE.ADMIN || ROLE.QAC), newsController.delete)
router.delete('/:id/force', isLoggedIn, authRole(ROLE.ADMIN || ROLE.QAC), newsController.force)

// // [POST] /news/store news
router.post('/store', isLoggedIn, newsController.store)

// [link bien dong] /news/show || /news/:slug
router.use('/:slug', newsController.show)

// /news/index - news.hbs
router.use('/', newsController.index)



module.exports = router;
