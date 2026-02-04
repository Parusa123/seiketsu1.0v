const express = require("express");
const router = express.Router();

const {
  createDustbin,
  getNearbyDustbins,
  reportOverflow, // 👈 ADD THIS
} = require("../controllers/dustbin.controller");

const authMiddleware = require("../middleware/auth.middleware");

// 🔐 Create dustbin (protected)
router.post("/", authMiddleware, createDustbin);

// 🌍 Find nearby dustbins (PUBLIC)
router.get("/near", getNearbyDustbins);

// 🚨 Report overflowing dustbin (protected)
router.patch("/:id/report", authMiddleware, reportOverflow);

module.exports = router;
