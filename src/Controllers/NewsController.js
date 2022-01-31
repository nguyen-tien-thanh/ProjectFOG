
const News = require('../models/News');
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')

class NewsController {
    
    //[GET] /News/create 
    create(req,res,next) {
        res.render('news/create');
    }

    //[GET] /News/trash 
    trash(req,res,next) {
        Promise.all([News.findDeleted({}), News.countDeleted(), News.count()])
        .then(([news, deletedCount, storedCount]) => 
        res.render('news/trash', {
            deletedCount,
            storedCount,
            news: multipleMongooseToObject(news),
            })
        )
        .catch(next) 
    }

    //[GET] /News/manage 
    manage(req,res,next) {
        Promise.all([News.find({}), News.countDeleted(), News.count()])
            .then(([news, deletedCount, storedCount]) => 
            res.render('news/manage', {
                deletedCount,
                storedCount,
                news: multipleMongooseToObject(news),
                })
            )
            .catch(next)
    }
    
    //[POST] /News/handle-form-actions
    handleFormActions(req,res,next) {
        switch (req.body.action){
            case 'delete':
                News.delete({_id: { $in: req.body.NewsIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                News.restore({_id: { $in: req.body.NewsIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'force':
                News.remove({_id: { $in: req.body.NewsIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({Message: 'Action is invalid !!'})
        }
    }

    //[POST] /News/:id/edit
    edit(req,res,next) {
        News.findById(req.params.id)
            .then(news => res.render('news/edit', {
                news: mongooseToObject(news)
            }))
            .catch(next);
    }

    //[PUT] /News/:id
    update(req,res,next) {
        news.updateOne({_id: req.params.id}, req.body)
            .then(news => res.redirect('/news'))
            .catch(next);
    }

    //[DELETE] /News/:id
    delete(req,res,next) {
        News.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
        
    }

    //[DELETE] /News/:id/force
    force(req,res,next) {
        News.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
        
    }

    //[RESTORE] /News/:id/store
    restore(req,res,next) {
        News.restore({_id: req.params.id})
            .then(() => res.redirect('/news/manage'))
            .catch(next);
        
    }

    //[POST] /store News
    store(req,res,next) {
        const eve = new News(req.body);
        eve.save()
            .then(() => res.redirect('/news'))
            .catch(error => {
                
            })
    }


    // [GET] /:slug
    // Find object in MongoDB by slug
    show(req,res,next){
        News.findOne({ slug: req.params.slug})
        .then (news => {
            // res.json(News);

            res.render('news/show', { 
                news: mongooseToObject(news) 
            });
        })
        .catch(next)
        // res.send('New detail !!! - '+ req.params.slug );
    }

    // [GET] /News
    index(req, res, next){
        News.find({})
        .then(news => {
            // News = News.map(cat => cat.toObject())
            res.render('news', {
                news: multipleMongooseToObject(news)
            })
        })
        .catch(err=>next(err));
    }

}

module.exports = new NewsController;

const res = require('express/lib/response');
const newsController = require('./NewsController');