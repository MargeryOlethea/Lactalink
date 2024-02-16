const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ChatRoomId: {
    type: ObjectId,
    required: true,
  },
  SenderId: {
    type: ObjectId,
    required: true,
  },
  message: {
    type: String,
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

module.exports = mongoose.model('chats', userSchema)