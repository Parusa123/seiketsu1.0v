const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route works ✅",
    user: req.user,
  });
});

module.exports = router;
