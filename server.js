const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')
const passUserToView = require('./middleware/pass-user-to-view')

const User = require('./models/user')
const authController = require('./controllers/auth')
const carController = require('./controllers/car')
const serviceController = require('./controllers/service')
const billController = require('./controllers/bill')

const isSignedIn = require('./middleware/is-signed-in')

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000'

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }))
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'))
// Morgan for logging HTTP requests
app.use(morgan('dev'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use(passUserToView)

app.use(authController)
app.use('/cars', carController)
app.use('/services', serviceController)
app.use('/bills', billController)

app.get('/', isSignedIn, async (req, res) => {
  try {
    //let page
    const userInDatabase = await User.findOne({
      username: req.session.user.username
    })
    if (userInDatabase.role === 'admin') {
      // page = './auth/index.ejs'
      res.redirect('/users')
    } else if (userInDatabase.role == 'supervisor') {
      res.redirect('/cars')
    } else {
    }
    //res.render('index.ejs', { page })
  } catch (err) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`)
})
