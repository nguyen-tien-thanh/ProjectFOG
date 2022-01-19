
const Category = require('../models/Category');
const { multipleMongooseToObject } = require('../ulti/mongoose')
class CategoryController {
    
    // [GET] /category
    index(req, res, next){
        Category.find({})
        .then(category => {
            // category = category.map(cat => cat.toObject())
            res.render('category', {
                category: multipleMongooseToObject(category)
            })
        })
        .catch(err=>next(err));
    }

    show(req,res){
        res.send('New detail !!!');
    }

}

module.exports = new CategoryController;

const res = require('express/lib/response');
const categoryController = require('./CategoryController');