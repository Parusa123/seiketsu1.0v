const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const {
  getAllRequests,
  approveRequest,
} = require("../controllers/admin.controller");

// 🔐 Admin only
router.get("/requests", authMiddleware, adminMiddleware, getAllRequests);
router.patch(
  "/requests/:id/approve",
  authMiddleware,
  adminMiddleware,
  approveRequest
);

module.exports = router;
