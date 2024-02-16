const express = require("express")
const { createChat, getChats } = require("../controllers/ChatController")
const router = express.Router()

router.post("/:roomId", createChat)
router.get("/:roomId", getChats)

module.exports = router