const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const express = require("express");
const router = express.Router();
const config = require("config");

router.post("/auth", async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) res.status(400).send("Invalid username or password");

  try {
    const isLogin = await bcrypt.compare(req.body.password, user.password);
    if (!isLogin) {
      res.status(400).send("Invalid username or password");
    } else {
      const token = jwt.sign({ _id: user.id }, config.get("eco_jwtPrivateKey"));
      res.status(200).send(token);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
