const Order = require("../model/order");
const DataTypes = require("sequelize");

async function createOrder(req, res) {
  const order = await Order.create(
    {
      customer_id: 1,
      order_items_id: 1,
    },
    {
      fields: ["id", "customer_id", "order_items_id"],
    }
  )
    .then((order) => {
      res.send(order);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = createOrder;
