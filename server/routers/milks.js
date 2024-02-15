const express = require("express")
const { createMilk, getMilk } = require("../controllers/MilkController")
const authentication = require("../middlewares/authentication")
const router = express.Router()

router.use(authentication)
router.post("/", createMilk)
router.get("/", getMilk)

module.exports = router