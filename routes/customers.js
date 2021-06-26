const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

  const isUser = await User.findOne({ where: { email: req.body.email } });

  if (isUser != null) {
    res
      .status(400)
      .send("User already exists. Try login or forget password options");
  } else
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
      const newUser = await createUser(user);
      const token = jwt.sign({ _id: newUser.id }, config.get("jwtPrivateKey"));
      res.header("x-auth-token", token).send(newUser);
    } catch (err) {
      res.status(500).send(err);
    }
});
//
router.put("/profile/:id", async (req, res) => {
  const { user, error } = validateInput(req.body);
  if (error) res.status(400).send({ error: error.details[0].message });

  const userDB = await User.findOne({ where: { id: req.params.id } });

  try {
    if (userDB.getDataValue("id") == req.params.id) {
      const result = await userDB.update(user);
      res.status(200).send(result);
    } else res.status(401).send("User not found.");
  } catch (err) {
    res.status(404).send(err);
  }
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
