
const categoryRouter = require('./category');
const siteRouter = require('./site');
const meRouter = require('./me');
const eventRouter = require('./event');
const newsRouter = require('./news');
const ideaRouter = require('./idea');
const accountRouter = require('./account');


function route(app){

    app.use('/account', accountRouter);

    app.use('/news', newsRouter);

    app.use('/idea', ideaRouter);

    app.use('/category', categoryRouter);

    app.use('/event', eventRouter);

    app.use('/me', meRouter);

    app.use('/',siteRouter);
}

module.exports=route;
