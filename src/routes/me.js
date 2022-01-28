const express = require('express');
const router = express.Router();

const categoryController = require('../Controllers/CategoryController');
const meController = require('../Controllers/MeController');

// [GET] /category/create category
router.get('/stored/category', meController.storedCategory)

// [GET] /category/delete category
router.get('/deleted/category', meController.deletedCategory)

router.get('/category/create', categoryController.create)


module.exports = router;
