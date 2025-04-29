const express = require("express");
const router = express.Router();
const controller = require("../controllers/driver");

// Declare Express methods for the /drivers endpoint
router.get("/", controller.getAll);          // GET /api/drivers
router.post("/", controller.create);           // POST /api/drivers
router.get("/:id", controller.get);            // GET /api/drivers/:id
router.put("/:id", controller.update);         // PUT /api/drivers/:id
router.delete("/:id", controller.delete);      // DELETE /api/drivers/:id

module.exports = router;