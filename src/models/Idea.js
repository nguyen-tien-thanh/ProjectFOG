
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Idea = new Schema({
    title: {type: String, minLength: 1, maxLength: 255},
    detail: {type: String, minLength: 1},
    categoryName: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comment: [{
        "userName": {type: String},
        "avatar": {type: String, default: "https://www.w3schools.com/howto/img_avatar.png"},
        "annoymous": {type: Boolean, default: false},
        "content": {type: String},
        "commentAt": {type: Date, default: Date.Now},
    }],
    file: {type: String, default: 'None'},
    ratings: {type: Number, default: 0},
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
