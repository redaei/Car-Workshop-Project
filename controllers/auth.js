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
  const users = await User.find({})
  const page = './auth/index.ejs'
  res.render('index.ejs', { page, users, message: message })
})

router.get('/users/:userId/edit', isSignedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    let page = './auth/edit.ejs'
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
        return res.send('Password and Confirm Password must match')
      }
      const hashedPassword = bcrypt.hashSync(req.body.password, 10)
      req.body.password = hashedPassword
    }

    await currentUser.updateOne(req.body)
    res.redirect('/users')
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
