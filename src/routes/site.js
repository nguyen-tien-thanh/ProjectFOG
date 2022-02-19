const express = require('express');
const router = express.Router();

const siteController = require('../Controllers/SiteController');


// [/register]
router.use('/register', siteController.register)

// // [POST] /categories/store category
router.post('/store', siteController.store)

// [login]
router.use('/login', siteController.login)

// [login]
router.get('/validation', siteController.validation)

// [link bien dong]
router.use('/search', siteController.search)

// siteController.contact
router.use('/contact', siteController.contact)

// [link bien dong] /category/show || /category/:slug
router.use('/:slug', siteController.show)

// siteController.index
router.use('/', siteController.index)



module.exports = router;
