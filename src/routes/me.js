const express = require('express');
const router = express.Router();

const categoryController = require('../Controllers/CategoryController');
const meController = require('../Controllers/MeController');
const eventController = require('../Controllers/EventController')

// [GET] /category/create category
router.get('/stored/category', meController.storedCategory)

// [GET] /category/delete category
router.get('/deleted/category', meController.deletedCategory)

// [GET] /category/delete category
router.get('/event', eventController.index)
router.get('/event/create', eventController.create)

router.get('/category/create', categoryController.create)


module.exports = router;
