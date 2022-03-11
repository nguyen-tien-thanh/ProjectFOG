const express = require('express');
const router = express.Router();

const siteController = require('../Controllers/SiteController');


const { isLoggedIn, authRole } = require('../ulti/authonize')

const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');


// [link bien dong]
// router.use('/secret', siteController.secret)
router.use('/secret', siteController.secret);

// [/register]
router.use('/register', siteController.register)

// // [POST] /categories/store category
router.post('/store', siteController.store)

// [login]
router.use('/login',siteController.login)

// [login]
router.post('/validation', passport.authenticate("local", {
    // successRedirect: "../",
    failureRedirect: "/login",
}), siteController.validation);

router.get('/logout',siteController.logout);

// siteController.contact
router.use('/contact', siteController.contact)

// siteController.termsandconditions
router.use('/termsandconditions', siteController.termsandconditions)

// [link bien dong]
router.use('/:slug', siteController.error)


// siteController.index
router.use('/', siteController.index)

module.exports = router;
