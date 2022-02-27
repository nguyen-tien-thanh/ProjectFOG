const express = require('express');
const router = express.Router();

const { isLoggedIn, authRole } = require('../ulti/authonize')
const {ROLE} = require('../models/Role')

const eventController = require('../Controllers/EventController');

// [POST] /event/handle-form-actions event
router.post('/handle-form-actions', isLoggedIn, authRole(ROLE.ADMIN || ROLE.QAC), eventController.handleFormActions)

// [GET] /event/create event
router.use('/create', isLoggedIn, eventController.create)

// [GET] /event/trash event
router.use('/trash', isLoggedIn, authRole(ROLE.ADMIN || ROLE.QAC), eventController.trash)

// [GET] /event/create event
router.use('/manage', isLoggedIn, authRole(ROLE.QAC), authRole(ROLE.ADMIN), eventController.manage)

// [GET] /event/:id/edit event
router.get('/:id/edit', isLoggedIn, authRole(ROLE.ADMIN || ROLE.QAC), eventController.edit)

// [PUT] /event/:id/update event
router.put('/:id', isLoggedIn, authRole(ROLE.ADMIN || ROLE.QAC), eventController.update)

// [PATCH] /event/:id/update event
router.patch('/:id/restore', isLoggedIn, eventController.restore)

// [DELETE] /event/:id/detele event
router.delete('/:id', isLoggedIn, authRole(ROLE.ADMIN || ROLE.QAC), eventController.delete)
router.delete('/:id/force', isLoggedIn, authRole(ROLE.ADMIN || ROLE.QAC), eventController.force)

// // [POST] /event/store event
router.post('/store', isLoggedIn, eventController.store)

// [link bien dong] /event/show || /event/:slug
router.use('/:slug', eventController.show)

// /event/index - event.hbs
router.use('/', eventController.index)



module.exports = router;
