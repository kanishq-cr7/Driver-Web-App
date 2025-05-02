const express     = require("express");
const { body, param } = require("express-validator");
const validate    = require("../middleware/validate");
const auth        = require("../middleware/auth");
const userCtrl    = require("../controllers/user");

const router = express.Router();

// Register
router.post(
  "/",
  [
    body("username").isString().notEmpty(),
    body("password").isLength({ min: 6 }),
    validate
  ],
  userCtrl.create
);

// The following routes require a valid JWT
router.use(auth.verifyToken);

router.get("/", userCtrl.getAll);

router.get(
  "/:id",
  [ param("id").isMongoId(), validate ],
  userCtrl.get
);

router.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("username").optional().isString(),
    body("password").optional().isLength({ min: 6 }),
    body("role").optional().isString(),
    validate
  ],
  userCtrl.update
);

router.delete(
  "/:id",
  [ param("id").isMongoId(), validate ],
  userCtrl.delete
);

module.exports = router;
