const mongoose = require('mongoose')

const billSchema = new mongoose.Schema(
  {
    amount: {
      type: Double,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid'],
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
