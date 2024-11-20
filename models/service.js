const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true
    },
    serviceDescription: {
      type: String
    },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service
