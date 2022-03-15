
const {ROLE} = require('../models/Role')
const User = require('../models/User');
const { mongooseToObject } = require('./mongoose');

// Check Log in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
        res.status(200).render('login', {
            title: 'Login',
            layout: 'intropage',
            requireLogin: '* You need to login first',
        });
}

function isManager(req,res,next){
    if(req.user.role == ROLE.STAFF){
        User.findOne({username: req.user.username})
            .then (user =>{
            res.render('index', {
                title: 'Homepage',
                layout: 'intropage',
                userLogin: mongooseToObject(user),
                roleNofitication: 'This is Manager page. You are not allowed !',
            })
        })
    }
    next()
}

function isAdmin(req,res,next){
    if(req.user.role !== ROLE.ADMIN){
        User.findOne({username: req.user.username})
            .then (user =>{
            res.render('index', {
                title: 'Homepage',
                layout: 'intropage',
                userLogin: mongooseToObject(user),
                roleNofitication: 'This is Admin page. You are not allowed !',
            })
        })
    }
    next()
}

function isQAC(req,res,next){
    if(req.user.role !== ROLE.QAC){
        User.findOne({username: req.user.username})
            .then (user =>{
            res.render('index', {
                title: 'Homepage',
                layout: 'intropage',
                userLogin: mongooseToObject(user),
                roleNofitication: 'This is QA Coordinator page. You are not allowed !',
            })
        })
    }
    next();
}

module.exports = { 
    isLoggedIn,
    isManager,
    isAdmin,
    isQAC,
}