
const categoryRouter = require('./category');
const siteRouter = require('./site');
const eventRouter = require('./event');
const newsRouter = require('./news');
const ideaRouter = require('./idea');
const userRouter = require('./user');

const { isLoggedIn, isManager, isAdmin, isQAC } = require('../ulti/authonize')

function route(app){

    app.use('/user', isLoggedIn, userRouter);

    app.use('/news', newsRouter);

    app.use('/idea', isLoggedIn, ideaRouter);

    app.use('/category', isLoggedIn, categoryRouter);

    app.use('/event', eventRouter);

    app.use('/',siteRouter);
}

module.exports=route;
