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

router.post("/:id", async (req, res) => {
  //
  try {
    const result = await createOrder(req.body);
    if (result) {
      console.log(result);
    }
    res.statusCode(400).send(result.error);
    // res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.statusCode(400).send(error);
  }
});

router.delete("/:id", (req, res) => {
  //
  res.send("cancel this order");
});

module.exports = router;
