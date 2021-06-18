const express = require("express");
const router = express.Router();
const createUser = require("../controllers/customer");

router.get("/", (req, res) => {
  res.send("all customers");
});

router.post("/addprofile", (req, res) => {
  createUser(req, res);
});
//
router.put("/profile/:id", (req, res) => {
  res.send("update customer profile");
});

router.delete("/profile/:id", (req, res) => {
  res.send("delete customer profile");
});

module.exports = router;
