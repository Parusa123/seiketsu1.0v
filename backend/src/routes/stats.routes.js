const express = require("express");
const router = express.Router();

const {
  getTopContributors,
  getAreaStats,
} = require("../controllers/stats.controller");

// 🏆 Top contributors
router.get("/top-contributors", getTopContributors);

// 📍 Area based stats (geo)
router.get("/area", getAreaStats);

module.exports = router;
