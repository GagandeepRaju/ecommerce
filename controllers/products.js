const Product = require("../model/product");
const DataTypes = require("sequelize");

async function addProduct({ title, price, imageUrl, description, category }) {
  return await Product.create(
    {
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
      category: category,
      updatedAt: DataTypes.NOW,
    },
    {
      fields: [
        "title",
        "price",
        "category",
        "imageUrl",
        "description",
        "updatedAt",
      ],
    }
  )
    .then((product) => {
      return product;
    })
    .catch((err) => {
      return err;
    });
}

module.exports = addProduct;
