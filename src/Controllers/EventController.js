
const Event = require('../models/Event');
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')

class EventController {
    
    //[GET] /event/create 
    create(req,res,next) {
        res.render('event/create');
    }

    //[GET] /event/trash 
    trash(req,res,next) {
        Promise.all([Event.findDeleted({}), Event.countDeleted(), Event.count()])
        .then(([event, deletedCount, storedCount]) => 
        res.render('event/trash', {
            deletedCount,
            storedCount,
            event: multipleMongooseToObject(event),
            })
        )
        .catch(next) 
    }

    //[GET] /event/manage 
    manage(req,res,next) {
        Promise.all([Event.find({}), Event.countDeleted(), Event.count()])
            .then(([event, deletedCount, storedCount]) => 
            res.render('event/manage', {
                deletedCount,
                storedCount,
                event: multipleMongooseToObject(event),
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
        Event.findById(req.params.id)
            .then(event => res.render('event/edit', {
                event: mongooseToObject(event)
            }))
            .catch(next);
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
        Event.findOne({ slug: req.params.slug})
        .then (event => {
            // res.json(event);

            res.render('event/show', { 
                event: mongooseToObject(event) 
            });
        })
        .catch(next)
        // res.send('New detail !!! - '+ req.params.slug );
    }

    // [GET] /event
    index(req, res, next){
        Event.find({})
        .then(event => {
            // event = event.map(cat => cat.toObject())
            res.render('event', {
                event: multipleMongooseToObject(event)
            })
        })
        .catch(err=>next(err));
    }

}

module.exports = new EventController;

const res = require('express/lib/response');
const eventController = require('./EventController');