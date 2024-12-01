const Service = require('../models/service.js')
const User = require('../models/user.js')
const Car = require('../models/car.js')
const Bill = require('../models/bill.js')

const express = require('express')
const router = express.Router()
const isSignedIn = require('../middleware/is-signed-in.js')

//

router.get('/', isSignedIn, async (req, res) => {
  const bills = await Bill.find({ createdBy: req.session.user })
    .populate('car')
    .populate('createdBy')
    .populate('service')
  const page = '../views/requests/index.ejs'
  res.render('index.ejs', { bills, page })
})

router.get('/new', isSignedIn, async (req, res) => {
  
  const services = await Service.find({createdBy: req.session.user})
  const page = '../views/requests/services.ejs'
  res.render('index.ejs', { services, page })
})
router.get('/new/:serviceId/newCar', isSignedIn, async (req, res) => {
  const service = await Service.findById(req.params.serviceId)
  const page = '../views/requests/newCar.ejs'
  res.render('index.ejs', { service, page })
})

router.get('/new/:serviceId', isSignedIn, async (req, res) => {
  const service = await Service.findById(req.params.serviceId)
  const cars = await Car.find({})
  const page = '../views/requests/cars.ejs'
  res.render('index.ejs', { service, cars, page })
})

router.get('/new/:serviceId/:carId', isSignedIn, async (req, res) => {
  try {
    // const service =  Service.findById()
    // const car =  Car.findById()
    // create bill with (car id, service id, user id )
    const lastBill = await Bill.findOne().sort('-billNo')
    let billNum = 1
    if (lastBill) {
      billNum = lastBill.billNo + 1
    }

    const bill = await Bill.create({
      billNo: billNum,
      createdBy: req.session.user,
      service: req.params.serviceId,
      car: req.params.carId
    })

    res.redirect('/requests')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

router.post('/new/:serviceId', isSignedIn, async (req, res) => {
  console.log('Helllooooo!!!')

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

  page = `/request/new/${req.params.serviceId}/${car._id}`
  res.redirect(`/requests/new/${req.params.serviceId}/${car._id}`)
})

//

module.exports = router
