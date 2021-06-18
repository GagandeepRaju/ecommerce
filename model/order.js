const DataTypes = require("sequelize");
const User = require("../model/user");
const OrderItem = require("../model/order_item");
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
  order_items_id: {
    type: DataTypes.INTEGER,
    references: {
      model: OrderItem,
      key: "id",
    },
  },
});

module.exports = Order;
