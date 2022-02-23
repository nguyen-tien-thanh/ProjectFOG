const User = require('../models/User');
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

    //[POST] /store User
    store(req,res,next) {
        const register = new User(req.body);
        register.save()
            .then(() => res.redirect('login'))
            .catch(next)
    }

    login(req, res, next){

        res.render('login', {layout: 'intropage'});
    }

    //[POST] /validation User
    validation(req,res,next) {
        User.findOne({email: req.body.email, password: req.body.password})
        .then (user => {
            res.render('user/show', { 
                user: mongooseToObject(user) 
            });
        })
        .catch(next => {
            console.log('Failed')
        })
    }

    // [GET] /:slug
    // Find object in MongoDB by slug
    show(req,res,next){
        User.findOne({ slug: req.params.slug})
        .then (user => {
            // res.json(User);

            res.render('user/show', { 
                user: mongooseToObject(user) 
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