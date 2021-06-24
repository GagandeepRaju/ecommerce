const DataTypes = require("sequelize");

const sequelize = require("../util/db");

const UserLogin = sequelize.define("customerlogin", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    references: {
      model: "customers",
      key: "email",
    },
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = UserLogin;
