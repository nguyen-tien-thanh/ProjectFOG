const express = require('express');
const router = express.Router();

const categoryController = require('../Controllers/CategoryController');

// [link bien dong]
router.use('/:slug', categoryController.show)

// categoryController.index
router.use('/', categoryController.index)



module.exports = router;
