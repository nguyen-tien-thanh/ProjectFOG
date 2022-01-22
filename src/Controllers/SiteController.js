

class SiteController {
    
    // [GET] /index -- Home page
    index(req, res, next){

        res.render('index', {layout: 'intropage'});
    }

    search(req,res){
        res.render('search');
    }

    home(req, res, next){

        res.render('home');
    }

}

module.exports = new SiteController;

const res = require('express/lib/response');
const siteController = require('./SiteController');