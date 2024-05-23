const { Order, OrderItem, Grocery, Log, sequelize } = require("../models");

const placeOrder = async (req, res) => {
  const { items } = req.body; // items is an array of { groceryId, quantity }
  const userId = req.user.id;

  const transaction = await sequelize.transaction();

  try {
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const grocery = await Grocery.findByPk(item.groceryId, { transaction });
      if (!grocery || grocery.available_quantity < item.quantity) {
        await transaction.rollback();
        return res
          .status(400)
          .send(`Not enough inventory for item: ${item.groceryId}`);
      }

      grocery.available_quantity -= item.quantity;
      await grocery.save({ transaction });

      totalAmount += item.quantity * grocery.price;

      orderItems.push({
        groceryId: item.groceryId,
        quantity: item.quantity,
        price: grocery.price,
      });

      await Log.create(
        {
          groceryId: grocery.id,
          action: "sold",
          details: { quantity: item.quantity },
          user: userId,
          timestamp: new Date(),
        },
        { transaction }
      );
    }

    const order = await Order.create(
      {
        userId,
        totalAmount,
      },
      { transaction }
    );

    for (const orderItem of orderItems) {
      orderItem.orderId = order.id;
      await OrderItem.create(orderItem, { transaction });
    }

    await transaction.commit();
    res.status(201).send(order);
  } catch (error) {
    await transaction.rollback();
    res.status(500).send("Failed to place order");
  }
};

module.exports = {
  placeOrder,
};
