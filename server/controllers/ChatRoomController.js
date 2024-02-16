const { ObjectId } = require("mongodb")
const ChatRoom = require("../models/chatroom")
const Chat = require("../models/chat")

class ChatRoomController {

  static async createChatRoom(req, res, next) {
    try {
      const { userId } = req.params
      // console.log(req.loginInfo)

      let chatRoom = await ChatRoom.findOne({
        FirstUserId: new ObjectId(userId), //donor
        SecondUserId: req.loginInfo.userId, //receiver
      })

      if (!chatRoom) {
        chatRoom = await ChatRoom.create({
          FirstUserId: new ObjectId(userId), //donor
          SecondUserId: req.loginInfo.userId, //receiver
        })
      }

      res.status(201).json({
        message: "Successfully join chatroom",
        data: chatRoom
      })

    } catch (error) {
      next(error)
    }
  }

  static async getChatRoom(req, res, next) {
    try {
      const { roomId } = req.params

      // let chatRoom = await ChatRoom.findOne({ _id: new ObjectId(roomId) })
      // let chats = await Chat.find({ ChatRoomId: new ObjectId(roomId) }).sort({ createdAt: -1 })

      // if (chats) {
      //   chatRoom["Chats"] = chats
      // }
      const agg = [
        {
          '$match': {
            '_id': new ObjectId('65ceee0cb5c1fdf8f1aec131')
          }
        }, {
          '$lookup': {
            'as': 'chats',
            'from': 'chats',
            'foreignField': 'ChatRoomId',
            'localField': '_id'
          }
        }
      ];

      let chatRoom = await ChatRoom.aggregate(agg)

      // sorting setelah lookup
      chatRoom[0]?.chats?.sort((a, b) => {
        return b.createdAt - a.createdAt
      })

      res.status(200).json({
        message: "Success get the chatroom",
        data: chatRoom[0]
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ChatRoomController