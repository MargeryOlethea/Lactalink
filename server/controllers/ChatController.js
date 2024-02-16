const { ObjectId } = require("mongodb")
const Chat = require("../models/chat")

class ChatController {

  static async createChat(req, res, next) {
    try {
      const { roomId } = req.params
      const { message } = req.body

      const newChat = await Chat.create({
        ChatRoomId: new ObjectId(roomId),
        SenderId: req.loginInfo.userId,
        message
      })

      res.status(201).json({
        message: "Successfully create new chat",
        data: newChat
      })
    } catch (error) {
      next(error)
    }
  }

  static async getChats(req, res, next) {
    try {
      const chats = await Chat.find({ ChatRoomId: req.params.roomId }).sort({ createdAt: -1 })

      res.status(200).json({
        message: "Successfully get chats",
        data: chats
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ChatController