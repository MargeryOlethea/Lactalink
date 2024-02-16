const express = require("express")
const { createChatRoom, getChatRoom } = require("../controllers/ChatroomController")
const router = express.Router()

router.post("/:userId", createChatRoom)
router.get("/:roomId", getChatRoom)

module.exports = router