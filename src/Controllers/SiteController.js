

class SiteController {
    
    // [GET] /index -- Home page
    index(req, res, next){
        
        // res.json({
        //     name : 'test',
        // });
        
        //=======================================================//
        // Category.find({}, function(err, category){
        //     if (!err) {
        //         res.json (category);
        //     }
        //     else {
        //         res.status(400).json({err: ' ERROR !!!'})
        //     }
        // })

        //=======================================================//
        

        // Catch error shortly
        // .catch(next); 

        res.render('index');
    }

    search(req,res){
        res.render('search');
    }

}

module.exports = new SiteController;

const res = require('express/lib/response');
const siteController = require('./SiteController');