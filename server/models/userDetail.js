const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  UserId: {
    type: ObjectId,
    required: true,
  },
  babyName: {
    type: String,
    required: true,
  },
  babyDOB: {
    type: Date,
    required: true,
  },
  babyGender: {
    type: String,
    required: true
  },
  bloodType: {
    type: String
  },
  bloodRhesus: {
    type: String,
    required: true
  },
  halal: {
    type: Boolean,
    required: true
  },
  egg: {
    type: Boolean,
  },
  dairy: {
    type: Boolean,
  },
  nuts: {
    type: Boolean,
  },
  soy: {
    type: Boolean,
  },
  seafood: {
    type: Boolean,
  },
  flourOrWheat: {
    type: Boolean,
  },
  redMeat: {
    type: Boolean,
  },
  spicyFood: {
    type: Boolean,
  },
  caffeine: {
    type: Boolean,
  },
})

module.exports = mongoose.model('userdetails', userSchema)