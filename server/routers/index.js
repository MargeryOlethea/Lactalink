const express = require("express")
const router = express.Router()
const users = require("./users")
const milks = require("./milks")
const { getAllUsers, register, login } = require("../controllers/UserController")

router.post("/register", register)
router.post("/login", login)

router.use("/users", users)
router.use("/milks", milks)

module.exports = router