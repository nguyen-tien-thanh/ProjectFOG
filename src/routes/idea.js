const express = require('express');
const router = express.Router();

const { isLoggedIn, isManager, isAdmin, isQAC } = require('../ulti/authonize')

const ideaController = require('../Controllers/IdeaController');

// [GET] /idea/download idea
router.get('/download', isLoggedIn, isAdmin, ideaController.download)

// [POST] /idea/:id/interactive idea
router.put('/:id/interactive', isLoggedIn, ideaController.interactive)

// [POST] /idea/handle-form-actions idea
router.post('/handle-form-actions', isLoggedIn, ideaController.handleFormActions)

// [POST] /idea/create idea
router.use('/create', isLoggedIn, ideaController.create)

// [POST] /idea/add-idea idea
router.use('/:id/add-idea', isLoggedIn, ideaController.addIdea)

// [GET] /idea/trash idea
router.use('/trash', isLoggedIn, isManager ,ideaController.trash)

// [GET] /idea/create idea
router.use('/manage', isLoggedIn, isManager, ideaController.manage)

// [GET] /idea/:id/edit idea
router.get('/:id/edit', isLoggedIn, ideaController.edit)

// [PUT] /idea/:id/update idea
router.put('/:id', isLoggedIn, ideaController.update)

// [PATCH] /idea/:id/update idea
router.patch('/:id/restore', isLoggedIn, ideaController.restore)

// [DELETE] /idea/:id/detele idea
router.delete('/:id', isLoggedIn, isManager, ideaController.delete)
router.delete('/:id/force', isLoggedIn, isManager, ideaController.force)

// // [POST] /idea/store idea
router.post('/store', isLoggedIn, ideaController.store)

// // [POST] /idea/storeComment idea
router.put('/:id/storeComment', isLoggedIn, ideaController.storeComment)

// [link bien dong] /idea/show || /idea/:slug
router.use('/:slug', isLoggedIn, ideaController.show)

// /idea/index - idea.hbs
router.use('/', isLoggedIn, ideaController.index)



module.exports = router;
