
const Category = require('../models/Category');
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')
class CategoryController {
    
    // [GET] /:slug
    // Find object in MongoDB by slug
    show(req,res,next){
        Category.findOne({ slug: req.params.slug})
        .then (category => {
            // res.json(category);

            res.render('categories/show', { 
                category: mongooseToObject(category) 
            });
        })
        .catch(next)
        // res.send('New detail !!! - '+ req.params.slug );
    }

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

}

module.exports = new CategoryController;

const res = require('express/lib/response');
const categoryController = require('./CategoryController');