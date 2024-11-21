const User = require('../models/user.js')

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const isSignedIn = require('../middleware/is-signed-in.js')

router.get('/users',isSignedIn, async (req, res) => {
  
  const page = '../views/auth/index.ejs'
  
  res.render('index.ejs', {page})
})

router.get('/newUser', isSignedIn, (req, res) => {
  res.render('auth/new.ejs')
})

router.post('/userCreate', async (req, res) => {
  const userInDB = await User.findOne({ username: req.body.username })

  if (userInDB) {
    return res.send('Username already taken!')
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.send('Password and Confirm Password must match')
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  const user = await User.create(req.body)
  const message = `${user.username} account has been created successfully.`
  res.render('index.ejs', { message: message })
})

router.get('/auth/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs')
})

router.post('/auth/sign-in', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username })
    if (!userInDatabase) {
      return res.send('Login failed . Please try again.')
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    )
    if (!validPassword) {
      const message = 'Login failed. Please try again.'
      return res.render('/auth/sign-in', { message })
    }

    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id
    }

    res.redirect('/')
  } catch (err) {
    console.log(err)
    const message = 'Error, Try Again!!'
    return res.render('/auth/sign-in', { message: message })
  }
})

router.get('/auth/sign-out', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})



module.exports = router
