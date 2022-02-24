const express = require('express');
const router = express.Router();

// const { isLoggedIn } = require('../ulti/authonize')

const siteController = require('../Controllers/SiteController');


const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');


//Check login 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

// [link bien dong]
// router.use('/secret', siteController.secret)
router.get('/secret', isLoggedIn, siteController.secret);

// [/register]
router.use('/register', siteController.register)

// // [POST] /categories/store category
router.post('/store', siteController.store)

// [login]
router.use('/login',siteController.login)

// [login]
router.post('/validation', passport.authenticate("local", {
    successRedirect: "../",
    failureRedirect: "/login",
}), siteController.validation);

router.get('/logout',siteController.logout);

// siteController.contact
router.use('/contact', isLoggedIn, siteController.contact)


// [link bien dong] /category/show || /category/:slug
router.use('/:slug', siteController.show)

// siteController.index
router.use('/', siteController.index)



module.exports = router;
