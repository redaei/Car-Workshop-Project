const Service = require('../models/service.js')
const User = require('../models/user.js')
const Car = require('../models/car.js')
const Bill = require('../models/bill.js')

const express = require('express')
const router = express.Router()
const isSignedIn = require('../middleware/is-signed-in.js')

//

router.get('/', isSignedIn, async (req, res) => {
  const services = await Service.find({})
  const page = '../views/requests/services.ejs'
  res.render('index.ejs', { services, page })
})
router.get('/:serviceId', isSignedIn, async (req, res) => {
  const service = await Service.findById(req.params.serviceId)
  const cars = await Car.find({})
  const page = '../views/requests/cars.ejs'
  res.render('index.ejs', { service, cars, page })
})

//

module.exports = router
