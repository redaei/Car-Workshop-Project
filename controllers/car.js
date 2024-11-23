const Car = require('../models/car.js')

const express = require('express')
const router = express.Router()
const isSignedIn = require('../middleware/is-signed-in.js')
const isAdmin = require('../middleware/isAdmin.js')

//

router.get('/', isSignedIn, async (req, res) => {
  const cars = await Car.find({})
  const page = '../views/cars/index.ejs'
  res.render('index.ejs', { cars, page })
})

router.get('/new', isSignedIn, (req, res) => {
  const page = '../views/cars/new.ejs'
  res.render('index.ejs', { page })
})

router.post('/', isSignedIn, async (req, res) => {
  let page
  let message
  const carInDB = await Car.findOne({ carNumber: req.body.carNumber })

  if (carInDB) {
    return res.send('This car is already registered!')
  }

  const car = await Car.create(req.body)
  message = `${car.carNumber} car has been added successfully.`
  const cars = await Car.find({})
  page = './cars/index.ejs'
  res.render('index.ejs', { page, cars, message })
})

//

module.exports = router
