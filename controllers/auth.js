const User = require('../models/user.js')

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const isSignedIn = require('../middleware/is-signed-in.js')
const isAdmin = require('../middleware/isAdmin.js')

router.get('/users', isSignedIn, isAdmin, async (req, res) => {
  const page = '../views/auth/index.ejs'
  const users = await User.find({})

  res.render('index.ejs', { users, page })
})

router.get('/newUser', isSignedIn, (req, res) => {
  let page = './auth/new.ejs'
  res.render('index.ejs', { page })
})

router.post('/userCreate', isSignedIn, async (req, res) => {
  try {
    let errMessage = ''
    let message = ''
    let page = ''
    const userInDB = await User.findOne({ username: req.body.username })

    if (userInDB) {
      errMessage = 'Username already taken!'
      page = './auth/new.ejs'
      return res.render('index.ejs', { page, errMessage })
    }

    if (req.body.password !== req.body.confirmPassword) {
      errMessage = 'Password and Confirm Password must match!'
      page = './auth/new.ejs'
      return res.render('index.ejs', { page, errMessage })
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    const user = await User.create(req.body)
    message = `${user.username} account has been created successfully.`
    const users = await User.find({})
    page = './auth/index.ejs'
    res.render('index.ejs', { page, users, message })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

router.get('/users/:userId/edit', isSignedIn, async (req, res) => {
  let page = ''

  try {
    const user = await User.findById(req.params.userId)
    page = './auth/edit.ejs'
    res.render('index.ejs', {
      user,
      page
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put('/users/:userId', isSignedIn, async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId)

    if (req.body.password === '') {
      req.body.password = currentUser.password
    } else {
      if (req.body.password !== req.body.confirmPassword) {
        errMessage = 'Password and Confirm Password must match!'
        page = './auth/edit.ejs'
        return res.render('index.ejs', { user: currentUser, page, errMessage })
      }
      const hashedPassword = bcrypt.hashSync(req.body.password, 10)
      req.body.password = hashedPassword
    }

    await currentUser.updateOne(req.body)
    message = `${currentUser.username} has been edited!`
    page = './auth/index.ejs'
    return res.render('index.ejs', { page, errMessage })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.delete('/users/:userId', isSignedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)

    await user.deleteOne()
    res.redirect('/users')
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

router.get('/auth/sign-in', (req, res) => {
  const page = './auth/sign-in.ejs'
  res.render('index.ejs', { page })
})

router.post('/auth/sign-in', async (req, res) => {
  let message = ''
  let page = ''
  try {
    const userInDatabase = await User.findOne({ username: req.body.username })
    if (!userInDatabase) {
      message = 'Login failed . Please try again.'
      page = './auth/sign-in.ejs'
      return res.render('index.ejs', { page, message })
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    )
    if (!validPassword) {
      message = 'Login failed. Please try again.'
      page = './auth/sign-in.ejs'
      return res.render('index.ejs', { page, message })
    }

    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
      role: userInDatabase.role
    }

    res.redirect('/')
  } catch (err) {
    console.log(err)
    message = 'Error, Try Again!!'
    page = './auth/sign-in.ejs'
    return res.render('index.ejs', { page, message })
  }
})

router.get('/auth/sign-out', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router
