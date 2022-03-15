const express = require('express');
const router = express.Router();

const { isLoggedIn, isManager, isAdmin, isQAC } = require('../ulti/authonize')

const eventController = require('../Controllers/EventController');

// [POST] /event/handle-form-actions event
router.post('/handle-form-actions', isLoggedIn, isManager, eventController.handleFormActions)

// [GET] /event/create event
router.use('/create', isLoggedIn, eventController.create)

// [GET] /event/trash event
router.use('/trash', isLoggedIn, isManager, eventController.trash)

// [GET] /event/create event
router.use('/manage', isLoggedIn, isManager, eventController.manage)

// [GET] /event/:id/edit event
router.get('/:id/edit', isLoggedIn, eventController.edit)

// [PUT] /event/:id/update event
router.put('/:id', isLoggedIn, eventController.update)

// [PATCH] /event/:id/update event
router.patch('/:id/restore', isLoggedIn, isManager, eventController.restore)

// [DELETE] /event/:id/detele event
router.delete('/:id', isLoggedIn, eventController.delete)
router.delete('/:id/force', isLoggedIn, isAdmin, eventController.force)

// // [POST] /event/store event
router.post('/store', isLoggedIn, eventController.store)

// [link bien dong] /event/show || /event/:slug
router.use('/:slug', eventController.show)

// /event/index - event.hbs
router.use('/', eventController.index)



module.exports = router;
