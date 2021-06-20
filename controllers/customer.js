const User = require("../model/user");
const Joi = require("joi");

const schema = Joi.object({
  first_name: Joi.string().min(5).max(50).required(),
  last_name: Joi.string().min(5).max(50).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(5).required(),
});
// const Schema = joi.

async function createUser({ first_name, last_name, email, password }) {
  return await User.create(
    {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    },
    {
      fields: ["first_name", "last_name", "email", "password"],
    }
  )
    .then((user) => {
      return user;
    })
    .catch((err) => {
      return err;
    });
}

function validateInput(data) {
  const { value, error } = schema.validate(data);
  return { user: value, error };
}

module.exports = {
  createUser,
  validateInput,
};
