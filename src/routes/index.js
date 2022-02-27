
const categoryRouter = require('./category');
const siteRouter = require('./site');
const meRouter = require('./me');
const eventRouter = require('./event');
const newsRouter = require('./news');
const ideaRouter = require('./idea');
const userRouter = require('./user');

const { isLoggedIn} = require('../ulti/authonize')

function route(app){

    app.use('/user',isLoggedIn, userRouter);

    app.use('/news', newsRouter);

    app.use('/idea', ideaRouter);

    app.use('/category',isLoggedIn, categoryRouter);

    app.use('/event',isLoggedIn, eventRouter);

    app.use('/me', meRouter);

    app.use('/',siteRouter);
}

module.exports=route;
