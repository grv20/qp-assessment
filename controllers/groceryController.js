const { Grocery, Log } = require("../models");

const getAllGroceries = async (req, res) => {
  const groceries = await Grocery.findAll();
  res.send(groceries);
};

const getGroceryDetails = async (req, res) => {
  const { id } = req.params;
  const grocery = await Grocery.findByPk(id, {
    include: [
      {
        model: Log,
        as: "logs", // Alias for the association
      },
    ],
  });

  if (!grocery) {
    return res.status(404).send("Grocery item not found");
  }

  res.send(grocery);
};

const addGrocery = async (req, res) => {
  const { name, price, available_quantity } = req.body;

  // Check if a grocery item with the same name already exists
  const existingGrocery = await Grocery.findOne({ where: { name } });
  if (existingGrocery) {
    return res
      .status(400)
      .send("A grocery item with the same name already exists");
  }

  // Create the new grocery item
  const grocery = await Grocery.create({ name, price, available_quantity });
  res.send(grocery);
};

const updateGrocery = async (req, res) => {
  const { id } = req.params;
  const { amount, name, price } = req.body;

  // Fetch the grocery item to update
  const grocery = await Grocery.findByPk(id);
  if (!grocery) {
    return res.status(404).send("Grocery item not found");
  }

  // Initialize an array to collect log entries
  const logEntries = [];

  // Log name change if name is provided and different from the current name
  if (name && name !== grocery.name) {
    logEntries.push({
      action: "name changed",
      details: { oldName: grocery.name, newName: name },
      user: req.user.id,
      timestamp: new Date(),
      groceryId: grocery.id,
    });

    grocery.name = name; // Update the name
  }

  // Log price change if provided and different from the current price
  if (price !== undefined && price !== grocery.price) {
    logEntries.push({
      action: "price changed",
      details: { oldPrice: grocery.price, newPrice: price },
      user: req.user.id,
      timestamp: new Date(),
      groceryId: grocery.id,
    });

    grocery.price = price;
  }

  // Update quantity and log the change
  grocery.available_quantity += amount;
  logEntries.push({
    action: amount > 0 ? "added" : "removed",
    details: { amount: Math.abs(amount) },
    user: req.user.id,
    timestamp: new Date(),
    groceryId: grocery.id,
  });

  // Save all log entries
  await Log.bulkCreate(logEntries);

  // Save the updated grocery item
  await grocery.save();

  res.send(grocery);
};

const purchaseGrocery = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  const grocery = await Grocery.findByPk(id);
  if (!grocery || grocery.available_quantity < amount) {
    return res.status(400).send("Not enough inventory");
  }

  // Update quantity and log
  grocery.available_quantity -= amount;
  const logEntry = {
    action: "purchased",
    details: { amount },
    user: req.user.id,
    timestamp: new Date(),
    groceryId: grocery.id,
  };
  await Log.create(logEntry);
  await grocery.save();
  res.send(grocery);
};

module.exports = {
  getAllGroceries,
  getGroceryDetails,
  addGrocery,
  updateGrocery,
  purchaseGrocery,
};
