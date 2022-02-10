
const categoryRouter = require('./category');
const siteRouter = require('./site');
const meRouter = require('./me');
const eventRouter = require('./event');
const newsRouter = require('./news');
const ideaRouter = require('./idea');


function route(app){

    app.use('/news', newsRouter);

    app.use('/idea', ideaRouter);

    app.use('/category', categoryRouter);

    app.use('/event', eventRouter);

    app.use('/me', meRouter);
    
    app.get('/register', (req, res) => {
        // console.log('User searchs:', req.query.q)
        res.render('register')
    })
    
    app.get('/login', (req, res) => {
        res.render('login')
    })

    app.use('/',siteRouter);
}

module.exports=route;
