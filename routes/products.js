const express = require("express");
const router = express.Router();
const { addProduct, validateInput } = require("../controllers/products");

router.get("/", (req, res) => {
  // get all products
  res.send(result);
});

router.post("/add-product", async (req, res) => {
  const { product, error } = validateInput(req.body);
  if (error) res.status(400).send({ error: error.details[0].message });

  try {
    const result = await addProduct(product);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send(err);
  }
});

// change existing product
router.put("/:id", (req, res) => {
  //
  res.send("product updated");
});

// delete product
router.delete("/:id", (req, res) => {
  //
  res.send("product delete");
});

module.exports = router;
