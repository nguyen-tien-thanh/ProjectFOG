const User = require('../models/User');
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')

const passport = require('passport');

class SiteController {
    
    // [GET] /index -- Home page
    index(req, res, next){
        if (req.isAuthenticated()) {
            User.findOne({username: req.user.username})
            .then (user =>{
                res.render('index', {
                    layout: 'intropage', 
                    userLogin: mongooseToObject(user)
                });
            })
        }
        else{
            
        res.render('index', {layout: 'intropage'});
        }
    }

    // [GET] /logout --> Home page
    logout (req, res) {
        req.logout();
        res.redirect('login');
    }

    contact(req, res,next){
        if (req.isAuthenticated()) {
            User.findOne({username: req.user.username})
            .then (user =>{
                res.render('contact', { 
                    userLogin: mongooseToObject(user)
                });
            })
        }
        else{
            res.render('contact')
        }
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
                                layout: 'intropage',
                                userLogin: mongooseToObject(user)
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
        // var username = req.body.username;
        // var password = req.body.password;

        // User.findOne({username: username}).then(function(user) {
        //     if(user){
        //       if (user.password == password){
        //           console.log('User connected');
        //           req.session.username = username;
        //           req.session.password = password;
        //           console.log(req.session);
        //         //   res.status(200).send('User Authentified');
        //       }else{
        //           res.status(401).send('Invalid Password');
        //       }
        //   }else{
        //       res.status(401).send('Username');
        //   }
        // });
        passport.authenticate("local")(
            req, res, function () {
                User.findOne({username: req.user.username})
                    .then (user =>{
                        res.render('index', { 
                            layout: 'intropage',
                            userLogin: mongooseToObject(user)
                        });
                    })
        });
    }

    // [GET] /:slug
    // Show 404 not found error
    error(req,res,next){
        if (req.isAuthenticated()) {
            User.findOne({username: req.user.username})
            .then (user =>{
                res.render('partials/error', { 
                    userLogin: mongooseToObject(user)
                });
            })
        }
        else{
            res.render('partials/error')
        }
    }

    termsandconditions(req, res, next){
        if (req.isAuthenticated()) {
            User.findOne({username: req.user.username})
            .then (user =>{
                res.render('termsandconditions', { 
                    userLogin: mongooseToObject(user)
                });
            })
        }
        else{
            res.render('termsandconditions')
        }
    }

    secret(req,res,next){
        if (req.isAuthenticated()) {
            User.findOne({username: req.user.username})
            .then (user =>{
                res.render('secret', { 
                    userLogin: mongooseToObject(user)
                });
            })
        }
        else{
            res.render('secret')
        }
    }

}

module.exports = new SiteController;

const res = require('express/lib/response');
const siteController = require('./SiteController');