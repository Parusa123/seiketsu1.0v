const express = require("express");
const router = express.Router();

const { getTopContributors } = require("../controllers/stats.controller");

// GET /api/stats/top-contributors
router.get("/top-contributors", getTopContributors);

module.exports = router;
