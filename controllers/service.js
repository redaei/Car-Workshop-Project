const Service = require('../models/service.js')
const User = require('../models/user.js')

const express = require('express')
const router = express.Router()
const isSignedIn = require('../middleware/is-signed-in.js')
const isAdmin = require('../middleware/isAdmin.js')

//

router.get('/', isSignedIn, async (req, res) => {
  const services = await Service.find({})
  const page = '../views/services/index.ejs'
  res.render('index.ejs', { services, page })
})

router.get('/new', isSignedIn, async (req, res) => {
  const users = await User.find({ role: 'worker' })
  const page = '../views/services/new.ejs'
  res.render('index.ejs', { page, users })
})

router.post('/', isSignedIn, async (req, res) => {
  let page
  let message
  const serviceInDB = await Service.findOne({
    serviceName: req.body.serviceName
  })
  console.log(req.body)

  if (serviceInDB) {
    return res.send('This service is already exist!')
  }

  const service = await Service.create(req.body)
  message = `${service.serviceName} service has been added successfully.`
  const services = await Service.find({})
  page = './services/index.ejs'
  res.render('index.ejs', { page, services, message })
})

router.get('/:serviceId', async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId).populate(
      'employees'
    )

    const page = './services/show.ejs'
    res.render('index.ejs', { page, service })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:serviceId/edit', isSignedIn, isAdmin, async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId)
    const users = await User.find({ role: 'worker' })
    let page = './services/edit.ejs'
    res.render('index.ejs', { service, users, page })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put('/:serviceId', isSignedIn, isAdmin, async (req, res) => {
  try {
    const currentService = await Service.findById(req.params.serviceId)

    await currentService.updateOne(req.body)
    res.redirect('/services')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.delete('/:serviceId', isSignedIn, isAdmin, async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId)

    await service.deleteOne()
    res.redirect('/services')
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

//

module.exports = router
