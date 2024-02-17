const express = require("express");
const {
  getAllUsers,
  createUserDetail,
  getUserLoginDetail,
} = require("../controllers/UserController");
const router = express.Router();


router.get("/", getAllUsers)

router.post("/detail", createUserDetail)
router.get("/detail", getUserLoginDetail)

module.exports = router;
