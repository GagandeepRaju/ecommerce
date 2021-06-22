const express = require("express");
const router = express.Router();
const { addProduct, validateInput } = require("../controllers/products");
const { QueryTypes, where } = require("sequelize");
const sequelize = require("../util/db");
const Product = require("../model/product");

router.get("/", async (req, res) => {
  try {
    const products = await sequelize.query(
      `select title, category, description, price from products`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (products.length > 0) {
      res.status(200).send(products);
    } else res.status(404).send("No order found");
  } catch (err) {
    res.status(500).send(err);
  }
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
router.put("/updateProduct/:id", async (req, res) => {
  //
  const { product, error } = validateInput(req.body);
  if (error) res.status(400).send({ error: error.details[0].message });

  const productToChange = await Product.findOne({
    where: { id: req.params.id },
  });

  try {
    if (productToChange.getDataValue("id") == req.params.id) {
      const result = await productToChange.update(product);
      res.status(200).send(result);
    } else res.status(401).send("Product not found.");
  } catch (err) {
    res.status(404).send(err);
  }
});

// delete product
router.delete("/product/:id", async (req, res) => {
  //
  try {
    let product = await Product.findOne({ where: { id: req.params.id } });
    if (product instanceof Product) {
      const result = await product.destroy();
      res.status(200).send(result);
    } else res.status(404).send("Product has already been deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
