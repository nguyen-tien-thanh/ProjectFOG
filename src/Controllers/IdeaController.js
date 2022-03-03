
const Idea = require('../models/Idea');
const User = require('../models/User');
const Category = require('../models/Category');
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')

const formidable = require("formidable");
var fs = require('fs');


class IdeaController {
    
    //[POST] /idea/:id/interactive
    interactive(req,res,next){
        const action = req.body.action;
        const counter = action === 'Like' ? 1 : -1;
        Idea.updateOne({_id: req.params.id}, {$inc: {ratings: counter}}, {}, (err, numberAffected) => {
            res.send('');
        });
        
    }

    //[GET] /idea/create 
    create(req,res,next) {
        if (req.isAuthenticated()) {
            Promise.all([Category.find({}), User.findOne({username: req.user.username})])
            .then(([category, userLogin]) => 
            res.render('idea/create', {
                category: multipleMongooseToObject(category),
                userLogin: mongooseToObject(userLogin),
                })
            )
            .catch(next)
        }
        else{
            Category.find({})
            .then(category => {
                // category = category.map(cat => cat.toObject())
                res.render('idea/create', {
                    category: multipleMongooseToObject(category)
                })
            })
            .catch(err=>next(err));
            }
    }

    //[GET] /idea/trash 
    trash(req,res,next) {
        Promise.all([Idea.findDeleted({}), Idea.countDeleted(), Idea.count(), User.findOne({username: req.user.username})])
        .then(([idea, deletedCount, storedCount, userLogin]) => 
        res.render('idea/trash', {
            deletedCount,
            storedCount,
            idea: multipleMongooseToObject(idea),
            userLogin: mongooseToObject(userLogin),
            })
        )
        .catch(next) 
    }

    //[GET] /idea/manage 
    manage(req,res,next) {
        Promise.all([Idea.find({}), Idea.countDeleted(), Idea.count(), User.findOne({username: req.user.username})])
            .then(([idea, deletedCount, storedCount, userLogin]) => 
            res.render('idea/manage', {
                deletedCount,
                storedCount,
                idea: multipleMongooseToObject(idea),
                userLogin: mongooseToObject(userLogin),
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
        const form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
  
        const oldPath = files.file.filepath;
        const newPath = 'src/uploads/idea/' + files.file.originalFilename
        const rawData = fs.readFileSync(oldPath)
        const idea = new Idea(fields);
        
            
            idea.file = files.file.originalFilename;
            fs.writeFile(newPath, rawData, function(err){
                if(err) console.log(err)
                idea.save()
                return res.send("Successfully uploaded")
            })
        })
    }


    //[POST] /storeComment idea
    storeComment(req,res,next) {
        Idea.findByIdAndUpdate({_id: req.params.id}, {$push: {comment: req.body}})
            .then(idea => res.redirect('/idea'))
            .catch(next);  
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
        // Idea.find({})
        // .then(idea => {
        //     // idea = idea.map(cat => cat.toObject())
        //     res.render('idea', {
        //         idea: multipleMongooseToObject(idea)
        //     })
        // })
        // .catch(err=>next(err));

        if (req.isAuthenticated()) {
            Promise.all([Idea.find({}).sort({ratings: -1}).limit(5), User.findOne({username: req.user.username})])
            .then(([idea, userLogin]) => 
            res.render('idea', {
                idea: multipleMongooseToObject(idea),
                userLogin: mongooseToObject(userLogin),
                })
            )
            .catch(next)
        }
        else{
            Idea.find({}).sort({ratings: -1}).limit(5)
            .then(idea => {
                // idea = idea.map(cat => cat.toObject())
                res.render('idea', {
                    idea: multipleMongooseToObject(idea)
                })
            })
            .catch(err=>next(err));
            }
    }

}

module.exports = new IdeaController;

const res = require('express/lib/response');
const ideaController = require('./IdeaController');