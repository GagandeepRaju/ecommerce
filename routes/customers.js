const express = require("express");
const router = express.Router();
const createUser = require("../controllers/customer");
const validateInput = require("../controllers/customer");

router.get("/", (req, res) => {
  res.send("all customers");
});

router.post("/addprofile", async (req, res) => {
  const { data, error } = validateInput(req.body);
  if (error) res.status(400).send({ error: error.details[0].message });

  try {
    const data = await createUser(req.body);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});
//
router.put("/profile/:id", (req, res) => {
  res.send("update customer profile");
});

router.delete("/profile/:id", (req, res) => {
  res.send("delete customer profile");
});

module.exports = router;
