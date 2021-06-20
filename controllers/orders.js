const Order = require("../model/order");
const Joi = require("joi");

const schema = Joi.object({
  customer_id: Joi.number().integer().required(),
  product_id: Joi.number().integer().required(),
});

async function createOrder({ product_id, customer_id }) {
  return await Order.create(
    {
      product_id: parseInt(product_id),
      customer_id: parseInt(customer_id),
    },
    {
      fields: ["product_id", "customer_id"],
    }
  )
    .then((order) => {
      return order;
    })
    .catch((err) => {
      return err;
    });
}

function validateInput(data) {
  const { value, error } = schema.validate(data);
  return { order: value, error: error };
}

module.exports = {
  validateInput,
  createOrder,
};
