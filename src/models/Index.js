const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
// db.user = require("./user");
db.role = require("./role");
db.ROLES = ["Admin","QA Manager", "QA Coordinator", "Staff"];

module.exports = db;


