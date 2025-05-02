const bcrypt = require("bcrypt");
const User   = require("../models/user");

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const exists = await User.findOne({ username });
    if (exists) return res.status(409).json({ error: "Username taken" });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash, role });
    await user.save();

    const out = user.toObject();
    delete out.password;
    res.status(201).json(out);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.username) updates.username = req.body.username;
    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }
    if (req.body.role) updates.role = req.body.role;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) { next(err); }
};

exports.delete = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) { next(err); }
};
