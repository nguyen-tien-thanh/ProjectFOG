const mongoose = require('mongoose')

async function connect(){
    mongoose.connect("mongodb://localhost/nodejs",{
    useNewUrlParser: true
    })
    mongoose.connection
    .once('open',()=> console.log('Database CK has been connected !!!'))
    .on('error',(error)=>{
        console.log("Can not connect to Database !!!", error)
    })
    }

module.exports = { connect }