class SiteController {
    
    // [GET] /index -- Home page
    index(req, res, next){

        res.render('index', {layout: 'intropage'});
    }

    contact(req, res, next){

        res.render('contact');
    }

    search(req,res){
        res.render('search');
    }

    home(req, res, next){

        res.render('home', {layout: 'intropage'});
    }

}

module.exports = new SiteController;

const res = require('express/lib/response');
const siteController = require('./SiteController');