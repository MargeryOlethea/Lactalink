const express = require("express")
const router = express.Router()
const users = require("./users")
const milks = require("./milks")
const chatrooms = require("./chatrooms")
const chats = require("./chats")
const { getAllUsers, register, login, ktpRegister } = require("../controllers/UserController")
const authentication = require("../middlewares/authentication")

const upload = require("../utils/multer")
const middlewareUpload = upload.single("file")

router.post("/ktp-registration", middlewareUpload, ktpRegister)
router.post("/registration", register)
router.post("/login", login)

router.use(authentication)
router.use("/users", users)
router.use("/milks", milks)
router.use("/chatrooms", chatrooms)
router.use("/chats", chats)

module.exports = router