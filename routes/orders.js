const express = require("express");
const { createOrder, validateInput } = require("../controllers/orders");
const router = express.Router();
//
router.get("/", (req, res) => {
  //
  res.send("all orders");
});

router.put("/:id", (req, res) => {
  //
  res.send("Change this order");
});

router.post("/:id", async (req, res) => {
  //
  const { order, error } = validateInput(req.body);
  if (error) res.status(400).send({ error: error.details[0].message });

  try {
    const result = await createOrder(order);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", (req, res) => {
  //
  res.send("cancel this order");
});

module.exports = router;
