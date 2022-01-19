const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    name: {type: String, minLength: 1, maxLength: 255},
    description: {type: String, maxLength: 600},
    image: {type : String, minLength : 1},
    slug: {type : String},
    createdAt: {type: Date, default : Date.Now},
    updateAt: {type: Date, default : Date.Now}
});

module.exports = mongoose.model('Category', Category);
