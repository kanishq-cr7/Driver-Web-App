const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username:   { type: String, required: true, unique: true },
  password:   { type: String, required: true },     // store hash
  role:       { type: String, default: "user" },    // e.g. 'user' or 'admin'
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
