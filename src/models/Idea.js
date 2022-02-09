const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Idea = new Schema({
    title: {type: String, minLength: 1, maxLength: 255},
    detail: {type: String, minLength: 1},
    type: {type: String, minLength: 1},
    author: {type: String, minLength:1},
    file: {type: String},
    like: {type: String},
    dislike: {type: String},
    view: {type: String},
    slug: {type : String, slug : 'title', unique: true},
    deletedAt: {},
    // createdAt: {type: Date, default : Date.Now},
    // updateAt: {type: Date, default : Date.Now}
}, {
    timestamps : true,
});

//Add plugin
Idea.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
});
mongoose.plugin(slug);

module.exports = mongoose.model('Idea', Idea);
