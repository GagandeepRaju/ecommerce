const express = require("express");
const app = express();
const Joi = require("joi");
const sequelize = require("./util/db");
const Product = require("./model/product");
const helmet = require("helmet");
const morgan = require("morgan");

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

// get request
// app.get("", (req, res) => {
//   res.send("Input received");
// });

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
// s();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listing to ${port}`);
});
