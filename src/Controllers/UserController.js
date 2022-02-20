
const User = require('../models/User');
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')

class UserController {

    //[GET] /User/create 
    create(req,res,next) {
        res.render('user/create');
    }

    //[GET] /User/trash 
    trash(req,res,next) {
        Promise.all([User.findDeleted({}), User.countDeleted(), User.count()])
        .then(([user, deletedCount, storedCount]) => 
        res.render('user/trash', {
            deletedCount,
            storedCount,
            user: multipleMongooseToObject(user),
            })
        )
        .catch(next) 
    }

    //[GET] /User/manage 
    manage(req,res,next) {
        Promise.all([User.find({}), User.countDeleted(), User.count()])
            .then(([user, deletedCount, storedCount]) => 
            res.render('user/manage', {
                deletedCount,
                storedCount,
                user: multipleMongooseToObject(user),
                })
            )
            .catch(next)
    }
    
    //[POST] /User/handle-form-actions
    handleFormActions(req,res,next) {
        switch (req.body.action){
            case 'delete':
                User.delete({_id: { $in: req.body.userIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                User.restore({_id: { $in: req.body.userIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'force':
                User.remove({_id: { $in: req.body.userIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({Message: 'Action is invalid !!'})
        }
    }

    //[POST] /User/:id/edit
    edit(req,res,next) {
        User.findById(req.params.id)
            .then(user => res.render('user/edit', {
                user: mongooseToObject(user)
            }))
            .catch(next);
    }

    //[PUT] /User/:id
    update(req,res,next) {
        User.updateOne({_id: req.params.id}, req.body)
            .then(user => res.redirect('/user'))
            .catch(next);
    }

    //[DELETE] /User/:id
    delete(req,res,next) {
        User.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
        
    }

    //[DELETE] /User/:id/force
    force(req,res,next) {
        User.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
        
    }

    //[RESTORE] /User/:id/store
    restore(req,res,next) {
        User.restore({_id: req.params.id})
            .then(() => res.redirect('/user/manage'))
            .catch(next);
        
    }

    //[POST] /store User
    store(req,res,next) {
        const eve = new User(req.body);
        eve.save()
            .then(() => res.redirect('/user'))
            .catch(next);
    }


    // [GET] /:slug
    // Find object in MongoDB by slug
    show(req,res,next){
        User.findOne({ slug: req.params.slug})
        .then (user => {
            // res.json(User);

            res.render('user/show', { 
                user: mongooseToObject(user) 
            });
        })
        .catch(next)
        // res.send('New detail !!! - '+ req.params.slug );
    }

    // [GET] /User
    index(req, res, next){
        User.find({})
        .then(user => {
            // User = User.map(cat => cat.toObject())
            res.render('user', {
                user: multipleMongooseToObject(user)
            })
        })
        .catch(err=>next(err));
    }

}

module.exports = new UserController;

const res = require('express/lib/response');
const userController = require('./UserController');