const express = require('express');
const router = express.Router();

const { isLoggedIn, authRole } = require('../ulti/authonize')
const {ROLE} = require('../models/Role')

const ideaController = require('../Controllers/IdeaController');

// [POST] /idea/:id/interactive idea
router.put('/:id/interactive', ideaController.interactive)

// [POST] /idea/handle-form-actions idea
router.post('/handle-form-actions', ideaController.handleFormActions)

// [POST] /idea/create idea
router.use('/create', ideaController.create)

// [GET] /idea/trash idea
router.use('/trash', ideaController.trash)

// [GET] /idea/create idea
router.use('/manage', ideaController.manage)

// [GET] /idea/:id/edit idea
router.get('/:id/edit', ideaController.edit)

// [PUT] /idea/:id/update idea
router.put('/:id', ideaController.update)

// [PATCH] /idea/:id/update idea
router.patch('/:id/restore', ideaController.restore)

// [DELETE] /idea/:id/detele idea
router.delete('/:id', ideaController.delete)
router.delete('/:id/force', ideaController.force)

// // [POST] /idea/addComment idea
router.post('/:id/addComment', ideaController.addComment)

// // [POST] /idea/store idea
router.post('/store', ideaController.store)

// [link bien dong] /idea/show || /idea/:slug
router.use('/:slug', ideaController.show)

// /idea/index - idea.hbs
router.use('/', ideaController.index)



module.exports = router;
