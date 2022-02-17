
const Account = require('../models/Account');
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')

class AccountController {
    
    //[GET] /Account/create 
    create(req,res,next) {
        res.render('account/create');
    }

    //[GET] /Account/trash 
    trash(req,res,next) {
        Promise.all([Account.findDeleted({}), Account.countDeleted(), Account.count()])
        .then(([account, deletedCount, storedCount]) => 
        res.render('account/trash', {
            deletedCount,
            storedCount,
            account: multipleMongooseToObject(account),
            })
        )
        .catch(next) 
    }

    //[GET] /Account/manage 
    manage(req,res,next) {
        Promise.all([Account.find({}), Account.countDeleted(), Account.count()])
            .then(([account, deletedCount, storedCount]) => 
            res.render('account/manage', {
                deletedCount,
                storedCount,
                account: multipleMongooseToObject(account),
                })
            )
            .catch(next)
    }
    
    //[POST] /Account/handle-form-actions
    handleFormActions(req,res,next) {
        switch (req.body.action){
            case 'delete':
                Account.delete({_id: { $in: req.body.accountIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Account.restore({_id: { $in: req.body.accountIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'force':
                Account.remove({_id: { $in: req.body.accountIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({Message: 'Action is invalid !!'})
        }
    }

    //[POST] /Account/:id/edit
    edit(req,res,next) {
        Account.findById(req.params.id)
            .then(account => res.render('account/edit', {
                account: mongooseToObject(account)
            }))
            .catch(next);
    }

    //[PUT] /Account/:id
    update(req,res,next) {
        Account.updateOne({_id: req.params.id}, req.body)
            .then(account => res.redirect('/account'))
            .catch(next);
    }

    //[DELETE] /Account/:id
    delete(req,res,next) {
        Account.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
        
    }

    //[DELETE] /Account/:id/force
    force(req,res,next) {
        Account.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
        
    }

    //[RESTORE] /Account/:id/store
    restore(req,res,next) {
        Account.restore({_id: req.params.id})
            .then(() => res.redirect('/account/manage'))
            .catch(next);
        
    }

    //[POST] /store Account
    store(req,res,next) {
        const eve = new Account(req.body);
        eve.save()
            .then(() => res.redirect('/account'))
            .catch(error => {
                
            })
    }


    // [GET] /:slug
    // Find object in MongoDB by slug
    show(req,res,next){
        Account.findOne({ slug: req.params.slug})
        .then (account => {
            // res.json(Account);

            res.render('account/show', { 
                account: mongooseToObject(account) 
            });
        })
        .catch(next)
        // res.send('New detail !!! - '+ req.params.slug );
    }

    // [GET] /Account
    index(req, res, next){
        Account.find({})
        .then(account => {
            // Account = Account.map(cat => cat.toObject())
            res.render('account', {
                account: multipleMongooseToObject(account)
            })
        })
        .catch(err=>next(err));
    }

}

module.exports = new AccountController;

const res = require('express/lib/response');
const accountController = require('./AccountController');