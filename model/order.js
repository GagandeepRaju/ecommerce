const { DataTypes } = require("sequelize");

const sequelize = require("../util/db");

const Order = sequelize.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = Order;
