const Bill = require('../models/bill.js')

const express = require('express')
const router = express.Router()
const isSignedIn = require('../middleware/is-signed-in.js')
const isAdmin = require('../middleware/isAdmin.js')

//

router.get('/', isSignedIn, async (req, res) => {
  const bills = await Bill.find({})
    .populate('car')
    .populate('createdBy')
    .populate('service')

  console.log(bills[0])

  const page = '../views/bills/index.ejs'
  res.render('index.ejs', { bills, page })
})

router.get('/new', isSignedIn, (req, res) => {
  const page = '../views/bills/new.ejs'
  res.render('index.ejs', { page })
})

router.post('/', isSignedIn, async (req, res) => {
  const bill = await Bill.create(req.body)
  const message = 'Bill has been added successfully.'
  const bills = await Bill.find({})
  const page = './bills/index.ejs'
  res.render('index.ejs', { page, bills, message })
})

router.get('/:billId', isSignedIn, isAdmin, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.billId)
      .populate('car')
      .populate('createdBy')
      .populate('service')
    const page = './bills/show.ejs'
    res.render('index.ejs', { page, bill })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:billId/edit', isSignedIn, isAdmin, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.billId)
    let page = './bills/edit.ejs'
    res.render('index.ejs', { bill, page })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put('/:billId', isSignedIn, isAdmin, async (req, res) => {
  try {
    const currentBill = await Bill.findById(req.params.billId)

    await currentBill.updateOne(req.body)
    res.redirect('/bills')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.delete('/:billId', isSignedIn, isAdmin, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.billId)

    await bill.deleteOne()
    res.redirect('/bills')
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

//

module.exports = router
