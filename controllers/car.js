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
  let errMessage
  const carInDB = await Car.findOne({ carNumber: req.body.carNumber })

  if (carInDB) {
    errMessage = 'This car is already registered!'
    page = './cars/new.ejs'
    return res.render('index.ejs', { page, errMessage })
  }

  const car = await Car.create(req.body)
  message = `${car.carNumber} car has been added successfully.`
  const cars = await Car.find({})
  page = './cars/index.ejs'
  res.render('index.ejs', { page, cars, message })
})

router.get('/:carId', async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId)
    const page = './cars/show.ejs'
    res.render('index.ejs', { page, car })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:carId/edit', isSignedIn, isAdmin, async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId)
    let page = './cars/edit.ejs'
    res.render('index.ejs', {
      car,
      page
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put('/:carId', isSignedIn, async (req, res) => {
  try {
    const currentCar = await Car.findById(req.params.carId)

    await currentCar.updateOne(req.body)
    res.redirect('/cars')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.delete('/:carId', isSignedIn, isAdmin, async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId)

    await car.deleteOne()
    res.redirect('/cars')
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

//

module.exports = router
