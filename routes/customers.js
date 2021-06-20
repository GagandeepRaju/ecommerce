const express = require("express");
const router = express.Router();
const { createUser, validateInput } = require("../controllers/customer");

router.get("/", (req, res) => {
  res.send("all customers");
});

router.post("/addprofile", async (req, res) => {
  const { user, error } = validateInput(req.body);
  if (error) res.status(400).send({ error: error.details[0].message });

  try {
    const result = await createUser(user);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
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
