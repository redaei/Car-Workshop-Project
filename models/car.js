const mongoose = require('mongoose')

const carSchema = new mongoose.Schema(
  {
    carNumber: {
      type: String,
      required: true
    },
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    ownerName: {
      type: String,
      required: true
    },
    contactNumber: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Car = mongoose.model('Car', carSchema)

module.exports = Car
