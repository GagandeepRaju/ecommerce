const DataTypes = require("sequelize");
const sequelize = require("../util/db");

const Product = require("../model/product");
const Order = require("../model/order");
const User = require("../model/user");

const Invoice = sequelize.define("order_invoice", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: User,
      key: "id",
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Invoice;
