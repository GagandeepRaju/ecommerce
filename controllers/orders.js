const Order = require("../model/order");

async function createOrder({ product_id, customer_id }) {
  return await Order.create(
    {
      product_id: product_id,
      customer_id: customer_id,
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
    })
    .finally((result) => {
      return result;
    });
}

module.exports = createOrder;
