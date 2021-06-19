const { DataTypes } = require("sequelize");

const sequelize = require("../util/db");

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Product;
