const express = require("express");
const router = express.Router();

router.get("/api/products", (req, res) => {
  res.send("Products");
});

router.post("/api/add-product", (req, res) => {
  res.send("add product");
});

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

module.exports = router;
