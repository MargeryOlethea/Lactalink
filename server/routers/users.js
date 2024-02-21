
const express = require("express")
<<<<<<< HEAD
const { getAllUsers, createUserDetail, getUserLoginDetail, editUserLoginDetail } = require("../controllers/UserController")
const router = express.Router()

=======
const { getAllUsers, createUserDetail, getUserLoginDetail } = require("../controllers/UserController")
const router = express.Router()

// buat coba-coba

>>>>>>> development
router.get("/", getAllUsers)

router.post("/detail", createUserDetail)
router.get("/detail", getUserLoginDetail)
router.put("/detail", editUserLoginDetail)

module.exports = router;
