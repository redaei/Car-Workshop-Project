const Bill = require('../models/bill.js')

const express = require('express')
const router = express.Router()
const isSignedIn = require('../middleware/is-signed-in.js')
const isAdmin = require('../middleware/isAdmin.js')
const isSupervisor = require('../middleware/isSupervisor.js')
const isWorker = require('../middleware/isWorker.js')

//

router.get('/', isSignedIn, isSupervisor, async (req, res) => {
  const bills = await Bill.find({})
    .populate('car')
    .populate('createdBy')
    .populate('service')

  const page = '../views/bills/index.ejs'
  res.render('index.ejs', { bills, page })
})

router.get('/:billId', isSignedIn, isSupervisor, async (req, res) => {
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

router.get('/:billId/edit', isSignedIn, isSupervisor, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.billId)
    let page = './bills/edit.ejs'
    res.render('index.ejs', { bill, page })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put('/:billId', isSignedIn, isSupervisor, async (req, res) => {
  try {
    const currentBill = await Bill.findById(req.params.billId)

    await currentBill.updateOne(req.body)
    res.redirect('/bills')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put('/:billId/:action', isSignedIn, isSupervisor, async (req, res) => {
  try {
    const currentBill = await Bill.findById(req.params.billId)

    req.body.paymentStatus = req.params.action

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
