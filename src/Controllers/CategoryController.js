
class CategoryController {
    
    // [GET] /category
    index(req, res){
        res.render('category');
    }

    show(req,res){
        res.send('New detail !!!');
    }

}

module.exports = new CategoryController;

const res = require('express/lib/response');
const categoryController = require('./CategoryController');