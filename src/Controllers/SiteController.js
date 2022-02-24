const User = require('../models/User');
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')
const { isLoggedIn } = require('../ulti/authonize')

const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

class SiteController {
    
    // [GET] /index -- Home page
    index(req, res, next){

        res.render('index', {layout: 'intropage'});
    }

    // [GET] /logout --> Home page
    logout (req, res) {
        req.logout();
        res.redirect('/');
    }

    contact(req, res, next){

        res.render('contact');
    }

    register(req, res, next){
        res.render('register', {layout: 'intropage'});
    }

    //[POST] /store User
    store(req,res,next) {
        // const register = new User(req.body);
        // register.save()
        //     .then(() => res.redirect('login'))
        //     .catch(next)
        
        var username = req.body.username
        var password = req.body.password
        User.register(new User({ username: username }),
                password, function (err, user) {
            if (err) {
                console.log(err);
                return res.redirect("register");
            }
    
            passport.authenticate("local")(
                req, res, function () {
                    User.findOne({username: req.user.username})
                        .then (user =>{
                            res.render('index', { 
                                user: mongooseToObject(user) 
                            });
                        })
            });
            
        });
    }

    login(req, res, next){

        res.render('login', {layout: 'intropage'});
    }

    //[POST] /validation User
    validation(req,res,next) {
        
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

    secret(req,res){
        res.render('secret');
    }

}

module.exports = new SiteController;

const res = require('express/lib/response');
const siteController = require('./SiteController');