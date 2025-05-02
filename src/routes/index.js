const express    = require("express");
const router     = express.Router();

const authRouter    = require("./auth");
const userRouter    = require("./user");
const driverRouter  = require("./driver");
const vehicleRouter = require("./vehicle");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/drivers", driverRouter);
router.use("/vehicles", vehicleRouter);

module.exports = router;
