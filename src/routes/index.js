const express = require("express");
const router = express.Router();

const driverRouter = require("./driver");
router.use('/drivers', driverRouter);

module.exports = router;