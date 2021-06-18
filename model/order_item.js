const DataTypes = require("sequelize");

const sequelize = require("../util/db");

const OrderItem = sequelize.define("order_items", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  items: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = OrderItem;
