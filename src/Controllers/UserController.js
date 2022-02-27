
const User = require('../models/User');
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')

class UserController {

    //[GET] /User/trash 
    trash(req,res,next) {
        
        Promise.all([User.findDeleted({}), User.countDeleted(), User.count(), User.findOne({username:req.user.username})])
        .then(([user, deletedCount, storedCount, userLogin]) => 
        res.render('user/trash', {
            deletedCount,
            storedCount,
            user: multipleMongooseToObject(user),
            userLogin: mongooseToObject(userLogin),
            })
        )
        .catch(next) 
    }

    //[GET] /User/manage 
    manage(req,res,next) {
        Promise.all([User.find({}), User.countDeleted(), User.count(), User.findOne({username: req.user.username})])
            .then(([user, deletedCount, storedCount, userLogin]) => 
            res.render('user/manage', {
                deletedCount,
                storedCount,
                user: multipleMongooseToObject(user),
                userLogin: mongooseToObject(userLogin),
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
        Promise.all([User.findById(req.params.id), User.findOne({username: req.user.username})])
            .then(([user, userLogin]) => 
            res.render('user/edit', {
                user: mongooseToObject(user),
                userLogin: mongooseToObject(userLogin),
                })
            )
            .catch(next)
        // if (req.isAuthenticated()) {
        //     User.findOne({username: req.user.username})
        //     .then (user =>{
        //         res.render('contact', { 
        //             userLogin: mongooseToObject(user)
        //         });
        //     })
        // }
        // else{
        //     res.render('contact')
        // }
        // User.findById(req.params.id)
        //     .then(user => res.render('user/edit', {
        //         user: mongooseToObject(user)
        //     }))
        //     .catch(next);
    }

    //[PUT] /User/:id
    update(req,res,next) {
        User.updateOne({_id: req.params.id}, req.body)
            .then(user => res.redirect('back'))
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
        Promise.all([User.findOne({ slug: req.params.slug}), User.findOne({username: req.user.username})])
            .then(([user, userLogin]) => 
            res.render('user/show', {
                user: mongooseToObject(user),
                userLogin: mongooseToObject(userLogin),
                })
            )
            .catch(next)
            
        // User.findOne({ slug: req.params.slug})
        // .then (user => {
        //     // res.json(User);

        //     res.render('user/show', { 
        //         user: mongooseToObject(user) 
        //     });
        // })
        // .catch(next)
    }

    // [GET] /User
    index(req, res, next){
        Promise.all([User.find({}), User.findOne({username: req.user.username})])
            .then(([user, userLogin]) => 
            res.render('user', {
                user: multipleMongooseToObject(user),
                userLogin: mongooseToObject(userLogin),
                })
            )
            .catch(next)

        // User.find({})
        // .then(user => {
        //     // User = User.map(cat => cat.toObject())
        //     res.render('user', {
        //         user: multipleMongooseToObject(user)
        //     })
        // })
        // .catch(next)
    }

}

module.exports = new UserController;

const res = require('express/lib/response');
const userController = require('./UserController');