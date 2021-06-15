const config = require("config");
const debug = require("debug")("app:startup");
const express = require("express");
const app = express();
const Joi = require("joi");
const sequelize = require("./util/db");
const Product = require("./model/product");
const helmet = require("helmet");
const morgan = require("morgan");

app.set("view engine", "pug");
app.set("views", "./views");

// middleware to convert the input in JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(morgan("short"));
// async function s() {
//   try {
//     const result = await sequelize.drop();
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// }
async function s() {
  await sequelize
    .sync()
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

// get request
app.get("", (req, res) => {
  res.render("views.pug", { title: "my expree", message: "bank" });
});

// s();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listing to ${port}`);
});
