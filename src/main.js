const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const hbs = exphbs.create({ extname: '.hbs' })
const path = require('path');

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))
//HTTP Loggers
app.use(morgan('combined'))

//Template engines
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set("views", path.join(__dirname, 'resources\\Views')); // cách mình tìm đến file, hệ điều hành window
console.log('PATH: ', path.join(__dirname, '.\\resources\\Views')); 


//Tao controller tu Home Index
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`)
})