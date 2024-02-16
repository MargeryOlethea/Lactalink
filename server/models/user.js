const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String
  },
  location: {
    type: String
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  role: {
    type: String,
    required: true
  },
  isRegistered: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('users', userSchema)