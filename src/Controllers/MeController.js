
const Category = require('../models/Category');
const { multipleMongooseToObject } = require('../ulti/mongoose');


class MeController {
    
    // [GET] /me/stored/category
    storedCategory(req, res, next) {

        // Category.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount)
        //     })
        //     .catch(next)
        

        Category.find({ deleted: false})
            .then (category => res.render('me/stored-category', {
             category: multipleMongooseToObject(category)
            }))
            .catch(next);
    }

    // [GET] /me/deleted/category
    deletedCategory(req, res, next) {
        Category.find({ deleted: !null})
            .then (category => res.render('me/deleted-category', {
             category: multipleMongooseToObject(category)
            }))
            .catch(next);
    }
}

module.exports = new MeController;

const res = require('express/lib/response');
const meController = require('./MeController');