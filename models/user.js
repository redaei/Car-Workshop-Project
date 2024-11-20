const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    employeeNumber: {
      type: Number,
      required: true
    },
    username: {
      type: String,
      required: true,
      minlenghth: [3, 'username must be more than 3 characters!'],
      maxlenghth: [10, 'this is too long name!']
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'supervisor', 'worker']
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
