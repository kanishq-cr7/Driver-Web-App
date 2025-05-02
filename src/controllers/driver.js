const Driver = require("../models/driver");

exports.getAll = async (req, res, next) => {
  try {
    const { first_name, last_name, licence_number, sortBy, sortOrder } = req.query;
    const filter = {};
    if (first_name)     filter.first_name     = new RegExp(first_name, "i");
    if (last_name)      filter.last_name      = new RegExp(last_name, "i");
    if (licence_number) filter.licence_number = licence_number;

    let query = Driver.find(filter).populate("createdBy", "username");
    if (sortBy) {
      const order = sortOrder === "desc" ? -1 : 1;
      query = query.sort({ [sortBy]: order });
    }
    const drivers = await query;
    res.json(drivers);
  } catch (err) { next(err); }
};

// GET /api/drivers/:id  (id = licence_number)
exports.get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findOne({ licence_number: id })
      .populate("createdBy", "username");
    if (!driver) return res.status(404).json({ error: "Driver not found" });
    return res.status(200).json(driver);
  } catch (err) {
    next(err);
  }
};

// POST /api/drivers
exports.create = async (req, res, next) => {
  try {
    const { first_name, last_name, licence_number, createdBy } = req.body;
    if (!first_name || !last_name || !licence_number || !createdBy) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const exists = await Driver.findOne({ licence_number });
    if (exists) return res.status(409).json({ error: "Driver already exists" });

    const driver = new Driver({ first_name, last_name, licence_number, createdBy });
    await driver.save();
    return res.status(201).json(driver);
  } catch (err) {
    next(err);
  }
};

// PUT /api/drivers/:id
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { first_name, last_name } = req.body;
    if (!first_name || !last_name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const driver = await Driver.findOneAndUpdate(
      { licence_number: id },
      { first_name, last_name },
      { new: true, runValidators: true }
    );

    if (!driver) return res.status(404).json({ error: "Driver not found" });
    return res.status(200).json(driver);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/drivers/:id
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findOneAndDelete({ licence_number: id });
    if (!driver) return res.status(404).json({ error: "Driver not found" });
    return res.status(200).json({ message: "Driver deleted" });
  } catch (err) {
    next(err);
  }
};
