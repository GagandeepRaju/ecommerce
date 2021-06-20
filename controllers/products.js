const Product = require("../model/product");
const DataTypes = require("sequelize");

const Joi = require("joi");

const schema = Joi.object({
  title: Joi.string().min(5).required(),
  price: Joi.number().min(0.99).required(),
  imageUrl: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
});

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

function validateInput(data) {
  const { value, error } = schema.validate(data);
  return { product: value, error: error };
}

module.exports = {
  addProduct,
  validateInput,
};
