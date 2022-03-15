const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Category = new Schema({
    categoryName: {type: String, minLength: 1, maxLength: 255},
    ideaCount: {type: Number, default: 0},
    slug: {type : String, slug : 'categoryName', unique: true},
    deadlineSubmit: {type: Date, default: Date.now() + (3600 * 1000 * 24 * 7)},
    deadlineCmt: {type: Date, default: Date.now() + (3600 * 1000 * 24 * 10)},
    deletedAt: {},
}, {
    timestamps : true,
});

//Add plugin
Category.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
});
mongoose.plugin(slug);

module.exports = mongoose.model('Category', Category);
