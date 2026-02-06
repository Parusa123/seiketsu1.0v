const express = require("express");
const router = express.Router();

const {
  getTopContributors,
  getAreaStats,
  getAreaHeatMap,
} = require("../controllers/stats.controller");

// 🏆 Top contributors
router.get("/top-contributors", getTopContributors);

// 📍 Area based stats (geo)
router.get("/area", getAreaStats);

//Area heatmap data
router.get("/heatmap", getAreaHeatMap)

module.exports = router;
