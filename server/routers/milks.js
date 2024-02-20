const express = require("express");
const {
  createMilk,
  getMilk,
  deleteMilk,
} = require("../controllers/MilkController");
const router = express.Router();

router.post("/", createMilk);
router.get("/", getMilk);
router.delete("/:id", deleteMilk);

module.exports = router;
