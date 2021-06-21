const express = require("express");
const { QueryTypes } = require("sequelize");
const router = express.Router();
const { createUser, validateInput } = require("../controllers/customer");
const User = require("../model/user");
const sequelize = require("../util/db");

router.get("/", async (req, res) => {
  try {
    const customers = await sequelize.query(
      `select first_name, last_name, email from customers`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (customers.length > 0) {
      res.status(200).send(customers);
    } else res.status(404).send("No order found");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
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
router.put("/profile", (req, res) => {
  res.send("update customer profile");
});

router.delete("/profile", async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.body.id } });
    if (user instanceof User) {
      const result = await user.destroy();
      res.status(200).send(result);
    } else res.status(404).send("User has already been deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
