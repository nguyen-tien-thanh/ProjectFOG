
const Category = require('../models/Category');
const { multipleMongooseToObject } = require('../ulti/mongoose');

class MeController {
    
    // [GET] /me/stored/category
    storedCategory(req, res, next) {
        Category.find({})
            .then (category => res.render('me/stored-category', {
             category: multipleMongooseToObject(category)
            }))
            .catch(next);
    }

}

module.exports = new MeController;

const res = require('express/lib/response');
const meController = require('./MeController');