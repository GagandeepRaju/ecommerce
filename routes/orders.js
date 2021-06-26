const express = require("express");
const { createOrder, validateInput } = require("../controllers/orders");
const Order = require("../model/order");
const { QueryTypes } = require("sequelize");
const router = express.Router();
const sequelize = require("../util/db");
const auth = require("../middleware/auth");

//
router.get("/", async (req, res) => {
  //middleware to check admin
  const id = req.body.id;
  try {
    const allOrders = await sequelize.query(
      `select o.id, c.first_name, c.email, c.id as customerId from orders o LEFT JOIN customers c ON c.id = o.customer_id where customer_id=${id}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (allOrders.length > 0) {
      res.status(200).send(allOrders);
    } else res.status(404).send("No order found");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/changeOrder", async (req, res) => {
  //
  try {
    const order = await Order.findOne({ where: { id: req.body.id } });
    if (order instanceof Order) {
      const result = await order.update(req.body);
      res.status(200).send(result);
    } else res.status(404).send("Order not found.");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/placeorder", auth, async (req, res) => {
  //add middleware latter to check if user exits
  const { order, error } = validateInput(req.body);
  if (error) res.status(400).send({ error: error.details[0].message });

  try {
    const result = await createOrder(order);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/cancelOrder", async (req, res) => {
  //
  try {
    const order = await Order.findOne({ where: { id: req.body.id } });
    if (order instanceof Order) {
      const result = await order.destroy();
      res.status(200).send(result);
    } else res.status(404).send("Order has already been Cancelled");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
