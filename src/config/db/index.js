const mongoose = require('mongoose')

async function connect(){
    
    mongoose.connect("mongodb+srv://dbadmin:dbadmin@cluster0.eyjvc.mongodb.net/DatabaseFOG?retryWrites=true&w=majority",{
    // mongoose.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",{
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    mongoose.connection
    .once('open',()=> console.log('Database FOG has been connected !!!'))
    .on('error',(error)=>{
        console.log("Can not connect to Database !!!", error)
    })
    }

    function initial() {
        Role.estimatedDocumentCount((err, count) => {
          if (!err && count === 0) {
            new Role({
              name: "Admin"
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'Admin' to roles collection");
            });
            new Role({
              name: "QA Manager"
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'QA Manager' to roles collection");
            });
            new Role({
              name: "QA Coordinator"
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'QA Coordinator' to roles collection");
            });
            new Role({
              name: "Staff"
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'Staff' to roles collection");
            });
          }
        });
      }
      

module.exports = { connect }

