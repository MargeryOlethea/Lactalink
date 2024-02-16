const express = require("express")
const { getAllUsers, createUserDetail, getUserLoginDetail } = require("../controllers/UserController")
const authentication = require("../middlewares/authentication")
const router = express.Router()

// buat coba-coba
router.use(authentication)

router.get("/", getAllUsers)
router.post("/detail", createUserDetail)
router.get("/detail", getUserLoginDetail)

module.exports = router