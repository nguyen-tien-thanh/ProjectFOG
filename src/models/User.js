const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const User = new Schema({
    name: {type: String, maxLength: 255, default:"No information"},
    username: {type: String, maxLength: 255, default:"No information"},
    email: {type: String, require: true},
    password: {type: String, minLength: 1, maxLength: 32},
    avatar: {type: String, default: "https://www.w3schools.com/howto/img_avatar.png"},    
    worktime: {type: String, maxLength: 255, default:"No information"},
    workplace: {type: String, maxLength: 255, default:"No information"},
    rolee: {type: String, maxLength: 255, default:"Not define"},
    phone: {type: Number, maxLength: 12, default:"123456789"},
    address: {type: String, maxLength: 255, default:"No information"},
    birth: {type: String, maxLength: 255, default:"No information"},
    gender: {type: String, maxLength: 255, default:"No information"},
    slug: {type : String, slug : 'email', unique: true},
    deletedAt: {},
    // createdAt: {type: Date, default : Date.Now},
    // updateAt: {type: Date, default : Date.Now}
}, {
    timestamps : true,
});

//Add plugin
User.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
});
mongoose.plugin(slug);

module.exports = mongoose.model('User', User);
