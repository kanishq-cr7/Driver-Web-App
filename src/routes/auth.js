const express = require("express");
const { body } = require("express-validator");
const validate    = require("../middleware/validate");
const authCtrl    = require("../controllers/auth");

const router = express.Router();

// Login endpoint
router.post(
  "/login",
  [
    body("username").isString().notEmpty(),
    body("password").isString().notEmpty(),
    validate
  ],
  authCtrl.login
);

module.exports = router;
