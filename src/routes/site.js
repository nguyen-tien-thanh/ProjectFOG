const express = require('express');
const router = express.Router();

const siteController = require('../Controllers/SiteController');

// [link bien dong]
router.use('/search', siteController.search)

// siteController.home
router.use('/home', siteController.home)

// siteController.contact
router.use('/contact', siteController.contact)

// siteController.index
router.use('/', siteController.index)



module.exports = router;
