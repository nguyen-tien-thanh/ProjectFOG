const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const User = new Schema({
    name: {type: String, maxLength: 255, default:"No information"},
    username: {type: String, maxLength: 255, default:"No information", required:true},
    email: {type: String, default:"No information"},
    password: {type: String, maxLength: 32, require:true},
    avatar: {type: String, default: "https://www.w3schools.com/howto/img_avatar.png"},    
    worktime: {type: String, maxLength: 255, default:"No information"},
    workplace: {type: String, maxLength: 255, default:"No information"},
    role: {type: String, maxLength: 20, default:"Staff"},
    phone: {type: Number, maxLength: 12, default:"123456789"},
    address: {type: String, maxLength: 255, default:"No information"},
    birth: {type: String, maxLength: 255, default:"No information"},
    gender: {type: String, maxLength: 255, default:"No information"},
    slug: {type : String, slug : 'username', unique: true},
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
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
