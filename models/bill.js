const mongoose = require('mongoose')

const billSchema = new mongoose.Schema(
  {
    billNo: {
      type: Number,
      required: true,
      default: 1
    },
    amount: {
      type: Number,
      required: true,
      default: 0
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Canceled'],
      default: 'Pending'
    },
    paymentDate: {
      type: Date
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car'
    }
  },
  {
    timestamps: true
  }
)

const Bill = mongoose.model('Bill', billSchema)

module.exports = Bill
