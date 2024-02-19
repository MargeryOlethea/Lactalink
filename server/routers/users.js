const express = require("express")
const { getAllUsers, createUserDetail, getUserLoginDetail, editUserLoginDetail } = require("../controllers/UserController")
const router = express.Router()

// buat coba-coba
router.get("/", getAllUsers)
// ---

router.post("/detail", createUserDetail)
router.get("/detail", getUserLoginDetail)
router.put("/detail", editUserLoginDetail)

module.exports = router