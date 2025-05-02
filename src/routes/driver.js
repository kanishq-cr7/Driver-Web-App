const express  = require("express");
const { body, param, query } = require("express-validator");
const validate = require("../middleware/validate");
const auth     = require("../middleware/auth");
const ctrl     = require("../controllers/driver");

const router = express.Router();

// All driver routes require authentication
router.use(auth.verifyToken);

// GET /api/drivers?first_name=…&sortBy=last_name&sortOrder=asc
router.get(
  "/",
  [
    query("first_name").optional().isString(),
    query("last_name").optional().isString(),
    query("licence_number").optional().isString(),
    query("sortBy").optional().isString(),
    query("sortOrder").optional().isIn(["asc", "desc"]),
    validate
  ],
  ctrl.getAll
);

router.post(
  "/",
  [
    body("first_name").isString().notEmpty(),
    body("last_name").isString().notEmpty(),
    body("licence_number").isString().notEmpty(),
    body("createdBy").isMongoId(),
    validate
  ],
  ctrl.create
);

router.get(
  "/:id",
  [ param("id").isString().notEmpty(), validate ],
  ctrl.get
);

router.put(
  "/:id",
  [
    param("id").isString().notEmpty(),
    body("first_name").isString().notEmpty(),
    body("last_name").isString().notEmpty(),
    validate
  ],
  ctrl.update
);

router.delete(
  "/:id",
  [ param("id").isString().notEmpty(), validate ],
  ctrl.delete
);

module.exports = router;
