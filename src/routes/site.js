const express = require('express');
const router = express.Router();

const siteController = require('../Controllers/SiteController');

// [link bien dong]
router.use('/search', siteController.search)

// siteController.index
router.use('/home', siteController.home)

// siteController.index
router.use('/', siteController.index)



module.exports = router;
