const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  username: Joi.string().min(4).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});



module.exports = {registerSchema, loginSchema}
