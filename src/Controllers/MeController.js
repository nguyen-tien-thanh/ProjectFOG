
const Category = require('../models/Category');
const { multipleMongooseToObject } = require('../ulti/mongoose');


class MeController {
    
    // [GET] /me/stored/category
    storedCategory(req, res, next) {

        Promise.all([Category.find({}), Category.countDeleted(), Category.count()])
            .then(([category, deletedCount, storedCount]) => 
            res.render('me/stored-category', {
                deletedCount,
                storedCount,
                category: multipleMongooseToObject(category),
                })
            )
            .catch(next)
            

        // Category.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount)
        //     })
        //     .catch(() => {});
        

        // Category.find({ deleted: false})
        //     .then (category => res.render('me/stored-category', {
        //      category: multipleMongooseToObject(category)
        //     }))
        //     .catch(next);
    }

    // [GET] /me/deleted/category
    deletedCategory(req, res, next) {
        // Category.find({ deleted: !null})
        // Category.findDeleted({})
        //     .then (category => res.render('me/deleted-category', {
        //      category: multipleMongooseToObject(category)
        //     }))
        //     .catch(next);
        Promise.all([Category.findDeleted({}), Category.countDeleted(), Category.count()])
        .then(([category, deletedCount, storedCount]) => 
        res.render('me/deleted-category', {
            deletedCount,
            storedCount,
            category: multipleMongooseToObject(category),
            })
        )
        .catch(next)   
    }
}

module.exports = new MeController;

const res = require('express/lib/response');
const meController = require('./MeController');