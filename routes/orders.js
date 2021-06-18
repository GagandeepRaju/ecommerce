const express = require("express");
const router = express.Router();
const createOrder = require("../controllers/orders");
//
router.get("/", (req, res) => {
  //
  res.send("all orders");
});

router.put("/:id", (req, res) => {
  //
  res.send("Change this order");
});

router.post("/:id", (req, res) => {
  //
  createOrder(req, res);
});

router.delete("/:id", (req, res) => {
  //
  res.send("cancel this order");
});

module.exports = router;
