const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  first_name:     { type: String, required: true },
  last_name:      { type: String, required: true },
  licence_number: { type: String, required: true, unique: true },
  createdBy:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Driver", driverSchema);
