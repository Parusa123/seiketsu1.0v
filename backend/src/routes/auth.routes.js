const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");

const authValidator = require("../validators/auth.validator");

// 🔍 DEBUG LOG (IMPORTANT)
console.log("AUTH VALIDATOR:", authValidator);

router.post(
  "/register",
  validate(authValidator.registerSchema),
  register
);

router.post(
  "/login",
  validate(authValidator.loginSchema),
  login
);

module.exports = router;
