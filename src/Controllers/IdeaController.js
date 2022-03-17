
const Idea = require('../models/Idea');
const User = require('../models/User');
const Category = require('../models/Category');
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')
const sendMail = require('../ulti/mail')
const mailComment = require('../ulti/mailComment')

const formidable = require("formidable");
var fs = require('fs');

// Libraries for Download all files uploaded
const path = require('path');
const admz = require('adm-zip');

//Download all submitted files as ZIP
const to_zip = fs.readdirSync(path.join(__dirname, '../uploads/idea'));

class IdeaController {

    
    //[GET] /idea/download
    download(req,res,next) {
        //request the specific file and then print the data in it
        res.sendFile(__dirname+'/'+'admin')
        //created as an object of class admz() which contains functionalities
        var zp = new admz();
        // file of our folder "uploads/idea" and convert each of them to a zip!
        for(var k=0 ; k<to_zip.length ; k++){
            zp.addLocalFile(path.join(__dirname , '../uploads/idea', to_zip[k]))
        }
        const file_after_download = 'fearOG_files.zip';
        const data = zp.toBuffer();
        res.set('Content-Type','application/octet-stream');
        res.set('Content-Disposition',`attachment; filename=${file_after_download}`);
        res.set('Content-Length',data.length);
        res.send(data);
    }

    //[PUT] /idea/:id/interactive
    interactive(req,res,next){
        const action = req.body.action;
        // const counter = action === 'Like' ? 1 : -1;
        var counter
        if (action ==='Like' || action ==='CancelUnlike'){
            counter = 1;
        }else if (action ==='LikeThenUnlike'){
            counter = -2;
        }else if (action ==='UnlikeThenLike'){
            counter = 2;
        }else {
            counter = -1;
        }
        Idea.updateOne({_id: req.params.id}, {$inc: {ratings: counter}}, {}, (err, numberAffected) => {
            res.send('');
        });
        
    }

    //[POST] /idea/:id/add-idea
    addIdea(req,res,next) {
        if (req.isAuthenticated()) {
            Promise.all([Category.findById(req.params.id), Category.find({}),
                User.findOne({username: req.user.username})])
            .then(([category, categoryList, userLogin]) => 
            res.render('idea/create', {
                title: 'Create Idea',
                category: mongooseToObject(category),
                categoryList: multipleMongooseToObject(categoryList),
                userLogin: mongooseToObject(userLogin),
                })
            )
            .catch(next)
        }
        else{
            Promise.all([Category.findById(req.params.id), Category.find({})])
            .then(([category, categoryList]) => 
            res.render('idea/create', {
                title: 'Create Idea',
                category: mongooseToObject(category),
                categoryList: multipleMongooseToObject(categoryList)
                })
            )
            .catch(err=>next(err));
            }
    }

    //[GET] /idea/create 
    create(req,res,next) {
        if (req.isAuthenticated()) {
            Promise.all([Category.find({}), User.findOne({username: req.user.username})])
            .then(([categoryList, userLogin]) => 
            res.render('idea/create', {
                title: 'Create Idea',
                categoryList: multipleMongooseToObject(categoryList),
                userLogin: mongooseToObject(userLogin),
                })
            )
            .catch(next)
        }
        else{
            Category.find({})
            .then(categoryList => {
                // categoryList = categoryList.map(cat => cat.toObject())
                res.render('idea/create', {
                    title: 'Create Idea',
                    categoryList: multipleMongooseToObject(categoryList)
                })
            })
            .catch(err=>next(err));
            }
    }

    //[GET] /idea/trash 
    trash(req,res,next) {
        Promise.all([Idea.findDeleted({}).populate('username').populate('categoryName'), 
                    Idea.countDeleted(), Idea.count(), User.findOne({username: req.user.username})])
        .then(([idea, deletedCount, storedCount, userLogin]) => 
        res.render('idea/trash', {
            title: 'Trash Idea',
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
        Promise.all([Idea.find({}).populate('username').populate('categoryName'), 
            Idea.countDeleted(), 
            Idea.count(), 
            User.findOne({username: req.user.username})])
            .then(([idea, deletedCount, storedCount, userLogin]) => 
            res.render('idea/manage', {
                title: 'Trash Idea',
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
            .then(() => res.redirect('/idea'))
            .catch(next);
    }

    //[PUT] /idea/:id/descCount
    descCount(req,res,next){
        console.log(req.params.id+ 'aaa')
        Category.updateOne({_id : req.params.id}, {$inc : {ideaCount : -1}}, {}, (err, numberAffected) => {
            res.send('');
        })
        

        // const action = req.body.action;
        // const counter = action === 'Like' ? 1 : -1;
        // Idea.updateOne({_id: req.params.id}, {$inc: {ratings: counter}}, {}, (err, numberAffected) => {
        //     res.send('');
        // });
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
        const newPath = path.join(__dirname, '../uploads/idea/') + files.file.originalFilename;
        const rawData = fs.readFileSync(oldPath);
        const idea = new Idea(fields);
        
            idea.file = files.file.originalFilename;
            fs.writeFile(newPath, rawData, function(err){
                if(err) console.log(err)
                idea.save(
                    function(err,idea){
                        if(err){
                            return res.status(400).send({
                                message : err
                            });
                        }else{

                            //Send mail to QA Manager
                            const subject = fields.title;
                            const text = fields.detail;
                            const author = fields.author;
                            const category = fields.category;
                            sendMail(subject, text, author, category);

                            // Increase ideaCount in Category field
                            const catId = fields.categoryName;
                            Category.updateOne({_id : catId}, {$inc : {'ideaCount' : 1}}, {}, (err, numberAffected) => {
                                
                            });
                            return res.redirect('/idea');
                        }
                    }
                )
            })
        })
    }


    //[POST] /storeComment idea
    storeComment(req,res,next) {

        const email = req.body.emailReceiver
        const ideaTitle = req.body.ideaTitle
        const content = req.body.content
        const author = req.body.userName

        Idea.findByIdAndUpdate({_id: req.params.id}, {$push: {comment: req.body}})
            .then(() => {
                mailComment(email, ideaTitle, content, author);
                res.redirect('/idea');
            })
            .catch(next);
    }


    // [GET] /:slug
    // Find object in MongoDB by slug
    show(req,res,next){
        Promise.all([Category.findOne({}), 
            Idea.findOne({ slug: req.params.slug}).populate('username').populate('categoryName'), 
            User.findOne({username: req.user.username})])
        .then(([category, idea, userLogin]) => 
        res.render('idea/show', {
            title: 'Detail Idea',
            category: mongooseToObject(category),
            idea: mongooseToObject(idea),
            userLogin: mongooseToObject(userLogin),
            })
        )
        .catch(next)

        // Idea.findOne({ slug: req.params.slug})
        // .then (idea => {
        //     // res.json(idea);

        //     res.render('idea/show', { 
        //         idea: mongooseToObject(idea) 
        //     });
        // })
        // .catch(next)
        // res.send('New detail !!! - '+ req.params.slug );
    }

    // [GET] /idea
    index(req, res, next){
        if (req.isAuthenticated()) {
            Promise.all([Idea.find({}).populate('username').populate('categoryName').sort({ratings: -1}), 
                        User.findOne({username: req.user.username})])
            .then(([idea, userLogin]) => 
            res.render('idea', {
                title: 'Idea',
                idea: multipleMongooseToObject(idea),
                userLogin: mongooseToObject(userLogin),
                })
            )
            .catch(next)
        }
        else{
            Idea.find({}).sort({ratings: -1})
            .then(idea => {
                // idea = idea.map(cat => cat.toObject())
                res.render('idea', {
                    title: 'Idea',
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