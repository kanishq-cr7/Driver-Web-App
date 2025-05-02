const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  model:       { type: String, required: true },
  plate:       { type: String, required: true, unique: true },
  type:        { type: String },
  driver:      { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Vehicle", vehicleSchema);
