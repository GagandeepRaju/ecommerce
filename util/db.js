const Sequelize = require("sequelize");

const sequelize = new Sequelize("ecommerce", "root", "Gagansuraj1!", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
