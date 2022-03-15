
const Event = require('../models/Event');
const User = require('../models/User');
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')

class EventController {
    
    //[GET] /event/create 
    create(req,res,next) {
        if (req.isAuthenticated()) {
            User.findOne({username: req.user.username})
            .then (user =>{
                res.render('event/create', { 
                    title:'Create Event',
                    userLogin: mongooseToObject(user)
                });
            })
        }
        else{
            res.render('event/create', { 
                title:'Create Event'})
        }
    }

    //[GET] /event/trash 
    trash(req,res,next) {
        Promise.all([Event.findDeleted({}), Event.countDeleted(), Event.count(), User.findOne({username:req.user.username})])
        .then(([event, deletedCount, storedCount, userLogin]) => 
        res.render('event/trash', {
            title:'Trash Event',
            deletedCount,
            storedCount,
            event: multipleMongooseToObject(event),
            userLogin: mongooseToObject(userLogin),
            })
        )
        .catch(next)
    }

    //[GET] /event/manage 
    manage(req,res,next) {
        Promise.all([Event.find({}), Event.countDeleted(), Event.count(), User.findOne({username: req.user.username})])
            .then(([event, deletedCount, storedCount, userLogin]) => 
            res.render('event/manage', {
                title: 'Manage Event',
                deletedCount,
                storedCount,
                event: multipleMongooseToObject(event),
                userLogin: mongooseToObject(userLogin),
                })
            )
            .catch(next)
    }
    
    //[POST] /event/handle-form-actions
    handleFormActions(req,res,next) {
        switch (req.body.action){
            case 'delete':
                Event.delete({_id: { $in: req.body.eventIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Event.restore({_id: { $in: req.body.eventIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'force':
                Event.remove({_id: { $in: req.body.eventIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({Message: 'Action is invalid !!'})
        }
    }

    //[POST] /event/:id/edit
    edit(req,res,next) {
        Promise.all([Event.findById(req.params.id), User.findOne({username: req.user.username})])
            .then(([event, userLogin]) => 
            res.render('event/edit', {
                title: 'Edit Event',
                event: mongooseToObject(event),
                userLogin: mongooseToObject(userLogin),
                })
            )
            .catch(next)
    }

    //[PUT] /event/:id
    update(req,res,next) {
        Event.updateOne({_id: req.params.id}, req.body)
            .then(event => res.redirect('/event'))
            .catch(next);
    }

    //[DELETE] /event/:id
    delete(req,res,next) {
        Event.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
        
    }

    //[DELETE] /event/:id/force
    force(req,res,next) {
        Event.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
        
    }

    //[RESTORE] /event/:id/store
    restore(req,res,next) {
        Event.restore({_id: req.params.id})
            .then(() => res.redirect('/event/manage'))
            .catch(next);
        
    }

    //[POST] /store event
    store(req,res,next) {
        const eve = new Event(req.body);
        eve.save()
            .then(() => res.redirect('/event'))
            .catch(error => {
                
            })
    }


    // [GET] /:slug
    // Find object in MongoDB by slug
    show(req,res,next){
        if (req.isAuthenticated()) {
        Promise.all([Event.find({}), Event.findOne({ slug: req.params.slug}), 
            User.findOne({username: req.user.username})])
            .then(([event, eventDetail, userLogin]) => 
            res.render('event/show', {
                title: 'Event detail',
                eventDetail: mongooseToObject(eventDetail),
                event: multipleMongooseToObject(event),
                userLogin: mongooseToObject(userLogin),
                })
            )
            .catch(next)
        }
        else{
            Promise.all([Event.find({}), Event.findOne({ slug: req.params.slug})])
                .then(([event, eventDetail]) => 
                res.render('event/show', {
                    title: 'Event detail',
                    eventDetail: mongooseToObject(eventDetail),
                    event: multipleMongooseToObject(event),
                    })
                )
                .catch(err=>next(err));
        }
    }

    // [GET] /event
    index(req, res, next){
        if (req.isAuthenticated()) {
            Promise.all([Event.find({}), User.findOne({username: req.user.username})])
            .then(([event, userLogin]) => 
            res.render('event', {
                title: 'Event',
                event: multipleMongooseToObject(event),
                userLogin: mongooseToObject(userLogin),
                })
            )
            .catch(next)
        }
        else{
            Event.find({})
            .then(event => {
                // event = event.map(cat => cat.toObject())
                res.render('event', {
                    title: 'Event',
                    event: multipleMongooseToObject(event)
                })
            })
            .catch(err=>next(err));
            }
    }

}

module.exports = new EventController;

const res = require('express/lib/response');
const eventController = require('./EventController');