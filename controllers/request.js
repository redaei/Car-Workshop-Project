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

router.get('/:serviceId/:carId', (req, res) => {
  const service =  Service.findById(req.params.serviceId)
  const car =  Car.findById(req.params.carId)
  // create bill with (car id, service id, user id )
  const bills = Bill.find({createdBy: req.session.user})
  const page = '../views/requests/index.ejs'
  res.render('index.ejs', { bills, page })
})

//

module.exports = router
