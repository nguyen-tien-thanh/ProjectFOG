const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Category = new Schema({
    name: {type: String, minLength: 1, maxLength: 255},
    description: {type: String, maxLength: 600},
    image: {type : String, minLength : 1},
    slug: {type : String, slug : 'name', unique: true},
    deletedAt: {},
    // createdAt: {type: Date, default : Date.Now},
    // updateAt: {type: Date, default : Date.Now}
}, {
    timestamps : true,
});

//Add plugin
Category.plugin(mongooseDelete, {
    ovverideMethode: true,
    deletedAt: true,
});
mongoose.plugin(slug);

module.exports = mongoose.model('Category', Category);
