
// const Category = require('../models/Category');
// const { multipleMongooseToObject } = require('../ulti/mongoose')
// const { mongooseToObject } = require('../ulti/mongoose')
// class CategoryController {

//         // [GET] /me/stored/category
//         manage(req, res, next) {

//             Promise.all([Category.find({}), Category.countDeleted(), Category.count()])
//                 .then(([category, deletedCount, storedCount]) => 
//                 res.render('category/manage', {
//                     deletedCount,
//                     storedCount,
//                     category: multipleMongooseToObject(category),
//                     })
//                 )
//                 .catch(next)
//         }
    
//         // [GET] /me/deleted/category
//         trash(req, res, next) {
//             Promise.all([Category.findDeleted({}), Category.countDeleted(), Category.count()])
//             .then(([category, deletedCount, storedCount]) => 
//             res.render('category/trash', {
//                 deletedCount,
//                 storedCount,
//                 category: multipleMongooseToObject(category),
//                 })
//             )
//             .catch(next)   
//         }
    
//     //[GET] /category/create 
//     create(req,res,next) {
//         res.render('category/create');
//     }
    
//     //[POST] /category/handle-form-actions
//     handleFormActions(req,res,next) {
//         switch (req.body.action){
//             case 'delete':
//                 Category.delete({_id: { $in: req.body.categoryIds}})
//                     .then(() => res.redirect('back'))
//                     .catch(next);
//                 break;
//             case 'restore':
//                 Category.restore({_id: { $in: req.body.categoryIds}})
//                     .then(() => res.redirect('back'))
//                     .catch(next);
//                 break;
//             case 'force':
//                 Category.remove({_id: { $in: req.body.categoryIds}})
//                     .then(() => res.redirect('back'))
//                     .catch(next);
//                 break;
//             default:
//                 res.json({Message: 'Action is invalid !!'})
//         }
//     }

//     //[POST] /category/:id/edit
//     edit(req,res,next) {
//         Category.findById(req.params.id)
//             .then(category => res.render('category/edit', {
//                 category: mongooseToObject(category)
//             }))
//             .catch(next);
//     }

//     //[PUT] /category/:id
//     update(req,res,next) {
//         Category.updateOne({_id: req.params.id}, req.body)
//             .then(category => res.redirect('/category'))
//             .catch(next);
//     }

//     //[DELETE] /category/:id
//     delete(req,res,next) {
//         Category.delete({_id: req.params.id})
//             .then(() => res.redirect('back'))
//             .catch(next);
        
//     }

//     //[DELETE] /category/:id/force
//     force(req,res,next) {
//         Category.deleteOne({_id: req.params.id})
//             .then(() => res.redirect('back'))
//             .catch(next);
        
//     }

//     //[RESTORE] /category/:id/store
//     restore(req,res,next) {
//         Category.restore({_id: req.params.id})
//             .then(() => res.redirect('/me/stored/category'))
//             .catch(next);
        
//     }

//     //[POST] /store category
//     store(req,res,next) {
//         const cat = new Category(req.body);
//         cat.save()
//             .then(() => res.redirect('/category'))
//             .catch(error => {
                
//             })
//     }


//     // [GET] /:slug
//     // Find object in MongoDB by slug
//     show(req,res,next){

//         Promise.all([Category.findOne({ slug: req.params.slug }), Category.find()])
//         .then(([category, list]) => 
//         res.render('category/show', {
//             category: mongooseToObject(category),
//             list: multipleMongooseToObject(list),
//             })
//         )
//         .catch(next)
//     }

//     // [GET] /category
//     index(req, res, next){
//         Category.find({})
//         .then(category => {
//             // category = category.map(cat => cat.toObject())
//             res.render('category', {
//                 category: multipleMongooseToObject(category)
//             })
//         })
//         .catch(err=>next(err));
//     }

// }

// module.exports = new CategoryController;

// const res = require('express/lib/response');
// const categoryController = require('./CategoryController');


const Category = require('../models/Category');
const User = require('../models/User');
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')

class CategoryController {
    //[GET] /category/create 
    create(req,res,next) {
        if (req.isAuthenticated()) {
            User.findOne({username: req.user.username})
            .then (user =>{
                res.render('category/create', { 
                    title: 'Create Category',
                    userLogin: mongooseToObject(user)
                });
            })
        }
        else{
            res.render('category/create', { 
                title: 'Create Category'}
                )
        }
    }
    //[GET] /category/trash 
    trash(req,res,next) {
        Promise.all([Category.findDeleted({}), Category.countDeleted(), Category.count(), User.findOne({username:req.user.username})])
        .then(([category, deletedCount, storedCount, userLogin]) => 
        res.render('category/trash', {
            title:'Trash',
            deletedCount,
            storedCount,
            category: multipleMongooseToObject(category),
            userLogin: mongooseToObject(userLogin),
            })
        )
        .catch(next)

        // Promise.all([Category.findDeleted({}), Category.countDeleted(), Category.count()])
        // .then(([category, deletedCount, storedCount]) => 
        // res.render('category/trash', {
        //     deletedCount,
        //     storedCount,
        //     category: multipleMongooseToObject(category),
        //     })
        // )
        // .catch(next) 
    }

    //[GET] /category/manage 
    manage(req,res,next) {
        Promise.all([Category.find({}), Category.countDeleted(), Category.count(), User.findOne({username: req.user.username})])
            .then(([category, deletedCount, storedCount, userLogin]) => 
            res.render('category/manage', {
                title: 'Manage',
                deletedCount,
                storedCount,
                category: multipleMongooseToObject(category),
                userLogin: mongooseToObject(userLogin),
                })
            )
            .catch(next)
    }
    
    //[POST] /category/handle-form-actions
    handleFormActions(req,res,next) {
        switch (req.body.action){
            case 'delete':
                Category.delete({_id: { $in: req.body.categoryIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Category.restore({_id: { $in: req.body.categoryIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'force':
                Category.remove({_id: { $in: req.body.categoryIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({Message: 'Action is invalid !!'})
        }
    }

    //[POST] /category/:id/edit
    edit(req,res,next) {
        Promise.all([Category.findById(req.params.id), User.findOne({username: req.user.username})])
            .then(([category, userLogin]) => 
            res.render('category/edit', {
                title:'Edit',
                category: mongooseToObject(category),
                userLogin: mongooseToObject(userLogin),
                })
            )
            .catch(next)

        // Category.findById(req.params.id)
        //     .then(category => res.render('category/edit', {
        //         category: mongooseToObject(category)
        //     }))
        //     .catch(next);
    }

    //[PUT] /category/:id
    update(req,res,next) {
        Category.updateOne({_id: req.params.id}, req.body)
            .then(category => res.redirect('/category'))
            .catch(next);
    }

    //[DELETE] /category/:id
    delete(req,res,next) {
        Category.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
        
    }

    //[DELETE] /category/:id/force
    force(req,res,next) {
        Category.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
        
    }

    //[RESTORE] /category/:id/store
    restore(req,res,next) {
        Category.restore({_id: req.params.id})
            .then(() => res.redirect('/category/manage'))
            .catch(next);
        
    }

    //[POST] /store category
    store(req,res,next) {
        const eve = new Category(req.body);
        eve.save()
            .then(() => res.redirect('/category'))
            .catch(error => {
                
            })
    }


    // [GET] /:slug
    // Find object in MongoDB by slug
    show(req,res,next){
        if (req.isAuthenticated()) {
            Promise.all([Category.find({}), Category.findOne({ slug: req.params.slug}), 
                User.findOne({username: req.user.username})])
                .then(([category, categoryDetail, userLogin]) => 
                res.render('category/show', {
                    title: 'Detail',
                    categoryDetail: mongooseToObject(categoryDetail),
                    category: multipleMongooseToObject(category),
                    userLogin: mongooseToObject(userLogin),
                    })
                )
                .catch(next)
        }
        else{
            Promise.all([Category.find({}), Category.findOne({ slug: req.params.slug})])
                .then(([category, categoryDetail]) => 
                res.render('category/show', {
                    title: 'Detail',
                    categoryDetail: mongooseToObject(categoryDetail),
                    category: multipleMongooseToObject(category),
                    })
                )
                .catch(err=>next(err));
        }
    }

    // [GET] /category
    index(req, res, next){
        if (req.isAuthenticated()) {
            Promise.all([Category.find({}), User.findOne({username: req.user.username})])
            .then(([category, userLogin]) => 
            res.render('category', {
                title: 'Category',
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
                res.render('category', {
                    title: 'Category',
                    category: multipleMongooseToObject(category)
                })
            })
            .catch(err=>next(err));
            }
    }
}

module.exports = new CategoryController;

const res = require('express/lib/response');
const categoryController = require('./CategoryController');