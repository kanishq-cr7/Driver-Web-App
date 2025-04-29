const drivers = [];

// 5.1 Get all drivers
exports.getAll = async (req, res) => {
  return res.status(200).json(drivers);
};

// 5.2 Get a specific driver by licence number
exports.get = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("Licence number required");

  const driver = drivers.find(d => d.licence_number.toString() === id);
  if (!driver) return res.status(204).send();

  return res.status(200).json(driver);
};

// 5.3 Create a new driver
exports.create = async (req, res) => {
  let { first_name, last_name, licence_number } = req.body;
  if (!first_name || !last_name || licence_number === undefined) {
    return res.status(400).send("Missing required fields");
  }

  // Preserve the original type of licence_number
  const existing = drivers.find(d => d.licence_number === licence_number);
  if (existing) return res.status(409).send("Driver already exists");

  const newDriver = { first_name, last_name, licence_number };
  drivers.push(newDriver);

  return res.status(201).json(newDriver);
};

// 5.4 Update an existing driver
exports.update = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body;

  if (!id) return res.status(400).send("Licence number required");
  if (!first_name || !last_name) {
    return res.status(400).send("Missing required fields");
  }

  const driver = drivers.find(d => d.licence_number.toString() === id);
  if (!driver) return res.status(204).send();

  driver.first_name = first_name;
  driver.last_name = last_name;

  return res.status(200).json(driver);
};

// 5.5 Delete a driver
exports.delete = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("Licence number required");

  const index = drivers.findIndex(d => d.licence_number.toString() === id);
  if (index === -1) return res.status(204).send();

  drivers.splice(index, 1);
  return res.status(200).send("Driver deleted");
};