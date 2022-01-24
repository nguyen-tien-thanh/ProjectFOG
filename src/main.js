const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path');
const methodOverride = require('method-override');


const hbs = exphbs.create({ 
  extname: '.hbs', 
  helper: {
    sum: (a,b) => a+b,
}})

const helpers = require('handlebars-helpers')();

const route = require('./routes');
const db = require('./config/db');

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))
//HTTP Loggers
app.use(morgan('combined'))

//Connect Database
db.connect();

//Middleware to solve Body Form
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'));



//Template engines
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set("views", path.join(__dirname, 'resources/Views')); // cách mình tìm đến file, hệ điều hành window
console.log('PATH: ', path.join(__dirname, '.\\resources\\Views')); 

// Routes init
route(app);


app.listen(port, () => {
  console.log(``)
  console.log(``)
  console.log(``)
  console.log(`Application listening at http://localhost:${port}`)
})