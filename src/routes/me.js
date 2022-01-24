const express = require('express');
const router = express.Router();

const meController = require('../Controllers/MeController');

// [GET] /category/create category
router.get('/stored/category', meController.storedCategory)




module.exports = router;
