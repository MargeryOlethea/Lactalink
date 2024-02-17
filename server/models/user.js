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
  profilePictureUrl: {
    type: String,
    default: "https://static.thenounproject.com/png/4530368-200.png"
  },
  location: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true
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