const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  UserId: {
    type: ObjectId,
    required: true,
  },
  totalBags: {
    type: Number,
    required: true,
  },
  totalMl: {
    type: Number,
    required: true,
  },
  pumpDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('milks', userSchema)