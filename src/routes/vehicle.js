const express  = require("express");
const { body, param, query } = require("express-validator");
const validate = require("../middleware/validate");
const auth     = require("../middleware/auth");
const ctrl     = require("../controllers/vehicle");

const router = express.Router();

router.use(auth.verifyToken);

router.get(
  "/",
  [
    query("model").optional().isString(),
    query("plate").optional().isString(),
    query("type").optional().isString(),
    query("sortBy").optional().isString(),
    query("sortOrder").optional().isIn(["asc","desc"]),
    validate
  ],
  ctrl.getAll
);

router.post(
  "/",
  [
    body("model").isString().notEmpty(),
    body("plate").isString().notEmpty(),
    body("driver").isMongoId(),
    validate
  ],
  ctrl.create
);

router.get(
  "/:id",
  [ param("id").isMongoId(), validate ],
  ctrl.get
);

router.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("model").optional().isString(),
    body("plate").optional().isString(),
    body("type").optional().isString(),
    validate
  ],
  ctrl.update
);

router.delete(
  "/:id",
  [ param("id").isMongoId(), validate ],
  ctrl.delete
);

module.exports = router;
