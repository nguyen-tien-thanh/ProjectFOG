
class SiteController {
    
    // [GET] /index -- Home page
    index(req, res){
        res.render('index');
    }

    search(req,res){
        res.render('search');
    }

}

module.exports = new SiteController;

const res = require('express/lib/response');
const siteController = require('./SiteController');