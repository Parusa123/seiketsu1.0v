const express = require("express");
const router = express.Router();

const {
  createDustbin,
  getNearbyDustbins,
} = require("../controllers/dustbin.controller");

const authMiddleware = require("../middleware/auth.middleware");

// 🔐 Create dustbin (protected)
router.post("/", authMiddleware, createDustbin);

// 🌍 Find nearby dustbins (PUBLIC)
router.get("/near", getNearbyDustbins);

module.exports = router;
