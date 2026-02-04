const express = require("express");
const router = express.Router();

const { createDustbin } = require("../controllers/dustbin.controller");
const authMiddleware = require("../middleware/auth.middleware");

// 🔐 Protected: create dustbin
router.post("/", authMiddleware, createDustbin);

module.exports = router;
