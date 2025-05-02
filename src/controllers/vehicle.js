const Vehicle = require("../models/vehicle");

exports.getAll = async (req, res, next) => {
  try {
    const { model, plate, type, sortBy, sortOrder } = req.query;
    const filter = {};
    if (model) filter.model = new RegExp(model, "i");
    if (plate) filter.plate = plate;
    if (type)  filter.type  = type;

    let query = Vehicle.find(filter).populate({
      path: "driver",
      select: "first_name last_name licence_number"
    });
    if (sortBy) {
      const order = sortOrder === "desc" ? -1 : 1;
      query = query.sort({ [sortBy]: order });
    }
    const vehicles = await query;
    res.json(vehicles);
  } catch (err) { next(err); }
};

// GET /api/vehicles/:id
exports.get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id).populate({
      path: "driver",
      select: "first_name last_name licence_number"
    });
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
    return res.status(200).json(vehicle);
  } catch (err) {
    next(err);
  }
};

// POST /api/vehicles
exports.create = async (req, res, next) => {
  try {
    const { model, plate, type, driver } = req.body;
    if (!model || !plate || !driver) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const exists = await Vehicle.findOne({ plate });
    if (exists) return res.status(409).json({ error: "Vehicle already exists" });

    const vehicle = new Vehicle({ model, plate, type, driver });
    await vehicle.save();
    return res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
};

// PUT /api/vehicles/:id
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = {};
    ["model", "plate", "type", "driver"].forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const vehicle = await Vehicle.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
    return res.status(200).json(vehicle);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/vehicles/:id
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
    return res.status(200).json({ message: "Vehicle deleted" });
  } catch (err) {
    next(err);
  }
};
