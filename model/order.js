const DataTypes = require("sequelize");

const User = require("../model/user");
const Product = require("../model/product");
const sequelize = require("../util/db");

const Order = sequelize.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  product: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: "id",
    },
  },
});

module.exports = Order;
