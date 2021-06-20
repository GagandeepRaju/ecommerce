const express = require("express");
const router = express.Router();
const addProduct = require("../controllers/products");

router.get("/", (req, res) => {
  // get all products
  res.send(result);
});

router.post("/add-product", async (req, res) => {
  // add new product
  try {
    const product = await addProduct(req.body);
    console.log(product);
    res.status(200).send(product);
  } catch (error) {
    res.status(404).send(error);
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

// input validation

// app.post("/api/course", (req, res) => {
//   const schema = Joi.object({
//     name: Joi.string().min(5).required(),
//   });

//   const { error, value } = schema.validate({ name: req.body.name });

//   if (error) {
//     res.send(error.message);
//   } else res.send(value);
// });
