
const Idea = require('../models/Idea');
const Category = require('../models/Category');
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')

class IdeaController {
    
    //[GET] /idea/create 
    create(req,res,next) {
        Category.find({})
        .then(category => {
            res.render('idea/create', {
                category: multipleMongooseToObject(category)
            })
        })
        .catch(err=>next(err));
    }

    //[GET] /idea/trash 
    trash(req,res,next) {
        Promise.all([Idea.findDeleted({}), Idea.countDeleted(), Idea.count()])
        .then(([idea, deletedCount, storedCount]) => 
        res.render('idea/trash', {
            deletedCount,
            storedCount,
            idea: multipleMongooseToObject(idea),
            })
        )
        .catch(next) 
    }

    //[GET] /idea/manage 
    manage(req,res,next) {
        Promise.all([Idea.find({}), Idea.countDeleted(), Idea.count()])
            .then(([idea, deletedCount, storedCount]) => 
            res.render('idea/manage', {
                deletedCount,
                storedCount,
                idea: multipleMongooseToObject(idea),
                })
            )
            .catch(next)
    }
    
    //[POST] /idea/handle-form-actions
    handleFormActions(req,res,next) {
        switch (req.body.action){
            case 'delete':
                Idea.delete({_id: { $in: req.body.ideaIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Idea.restore({_id: { $in: req.body.ideaIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'force':
                Idea.remove({_id: { $in: req.body.ideaIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({Message: 'Action is invalid !!'})
        }
    }

    //[POST] /idea/:id/edit
    edit(req,res,next) {
        Idea.findById(req.params.id)
            .then(idea => res.render('idea/edit', {
                idea: mongooseToObject(idea)
            }))
            .catch(next);
    }

    //[PUT] /idea/:id
    update(req,res,next) {
        Idea.updateOne({_id: req.params.id}, req.body)
            .then(idea => res.redirect('/idea'))
            .catch(next);
    }

    //[DELETE] /idea/:id
    delete(req,res,next) {
        Idea.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
        
    }

    //[DELETE] /idea/:id/force
    force(req,res,next) {
        Idea.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
        
    }

    //[RESTORE] /idea/:id/store
    restore(req,res,next) {
        Idea.restore({_id: req.params.id})
            .then(() => res.redirect('/idea/manage'))
            .catch(next);
        
    }

    //[POST] /store idea
    store(req,res,next) {
        const eve = new Idea(req.body);
        eve.save()
            .then(() => res.redirect('/idea'))
            .catch(error => {
                
            })
    }


    // [GET] /:slug
    // Find object in MongoDB by slug
    show(req,res,next){
        Idea.findOne({ slug: req.params.slug})
        .then (idea => {
            // res.json(idea);

            res.render('idea/show', { 
                idea: mongooseToObject(idea) 
            });
        })
        .catch(next)
        // res.send('New detail !!! - '+ req.params.slug );
    }

    // [GET] /idea
    index(req, res, next){
        Idea.find({})
        .then(idea => {
            // idea = idea.map(cat => cat.toObject())
            res.render('idea', {
                idea: multipleMongooseToObject(idea)
            })
        })
        .catch(err=>next(err));
    }

}

module.exports = new IdeaController;

const res = require('express/lib/response');
const ideaController = require('./IdeaController');