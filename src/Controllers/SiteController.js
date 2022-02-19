const Account = require('../models/Account');
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')
class SiteController {
    
    // [GET] /index -- Home page
    index(req, res, next){

        res.render('index', {layout: 'intropage'});
    }

    contact(req, res, next){

        res.render('contact');
    }

    register(req, res, next){

        res.render('register');
    }

    //[POST] /store Account
    store(req,res,next) {
        const register = new Account(req.body);
        register.save()
            .then(() => res.redirect('login'))
            .catch(next)
    }

    login(req, res, next){

        res.render('login');
    }

    //[POST] /validation Account
    validation(req,res,next) {
        Account.findOne({email: req.query.email, password: req.query.password})
        .then (account => {
            res.render('account/show', { 
                account: mongooseToObject(account) 
            });
        })
        .catch(next)
    }

    // [GET] /:slug
    // Find object in MongoDB by slug
    show(req,res,next){
        Account.findOne({ slug: req.params.slug})
        .then (account => {
            // res.json(Account);

            res.render('account/show', { 
                account: mongooseToObject(account) 
            });
        })
        .catch(next)
        // res.send('New detail !!! - '+ req.params.slug );
    }

    search(req,res){
        res.render('search');
    }

}

module.exports = new SiteController;

const res = require('express/lib/response');
const siteController = require('./SiteController');