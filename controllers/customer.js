const User = require("../model/user");
const DataTypes = require("sequelize");

async function createUser(req, res) {
  const user = await User.create(
    {
      first_name: "Gagandeep",
      last_name: "Raju",
      email: "raju.gagan@gmail.com",
      password: "password",
    },
    {
      fields: ["first_name", "last_name", "email", "password", "updatedAt"],
    }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = createUser;
