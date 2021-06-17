const config = require("config");
const debug = require("debug")("app:startup");
const express = require("express");
const app = express();
const Joi = require("joi");
const sequelize = require("./util/db");
const helmet = require("helmet");
const morgan = require("morgan");

// models
const User = require("./model/user");
const Order = require("./model/order");

const products = require("./routes/products");
const orders = require("./routes/orders");
const customers = require("./routes/customers");

// middleware to convert the input in JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(morgan("short"));

app.use("/api/products", products);
app.use("/api/orders", orders);
app.use("/api/customers", customers);

async function b() {
  await sequelize
    .sync({ force: true })
    .then((result) => {
      console.log(result);
      // starting the server
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log(`Server is listing to ${port}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// configuration
// console.log("Application name: " + config.get("name"));
// console.log("Mail server: " + config.get("mail.host"));
// console.log("Mail password: " + config.get("mail.password"));
// b();
// sequelize.sync();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listing to ${port}`);
});
