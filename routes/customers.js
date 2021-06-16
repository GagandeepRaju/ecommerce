const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("all customers");
});

router.post("/addprofile", (req, res) => {
  res.send("new customer ");
});
//
router.put("/profile/:id", (req, res) => {
  res.send("update customer profile");
});

router.delete("/profile/:id", (req, res) => {
  res.send("delete customer profile");
});

module.exports = router;
