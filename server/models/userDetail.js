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
    type: String,
    required: true
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
    required: true
  },
  dairy: {
    type: Boolean,
    required: true
  },
  nuts: {
    type: Boolean,
    required: true
  },
  soy: {
    type: Boolean,
    required: true
  },
  seafood: {
    type: Boolean,
    required: true
  },
  flourOrWheat: {
    type: Boolean,
    required: true
  },
  redMeat: {
    type: Boolean,
    required: true
  },
  spicyFood: {
    type: Boolean,
    required: true
  },
  caffeine: {
    type: Boolean,
    required: true
  },
})

module.exports = mongoose.model('userdetails', userSchema)