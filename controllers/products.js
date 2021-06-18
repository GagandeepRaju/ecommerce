const Product = require("../model/product");
const DataTypes = require("sequelize");

async function addProduct(req, res) {
  await Product.create(
    {
      title: "shirt",
      price: 10.99,
      imageUrl: "https://picsum.photos/200/300",
      description: "new shirt",
      updatedAt: DataTypes.NOW,
    },
    {
      fields: ["title", "price", "imageUrl", "description", "updatedAt"],
    }
  )
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = addProduct;
