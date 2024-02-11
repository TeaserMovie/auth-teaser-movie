require("dotenv/config");
const userModel = require("../models/user.model");
const createError = require('http-errors')

const { registerSchema, loginSchema } = require("../utils.js/validation.schema");
const { signAccessToken, refreshAccessToken } = require("../utils.js/jwt.utils");


async function registerController(req, res) {
  const result = await registerSchema.validateAsync(req.body);

  const user = new userModel({
    username: result.username,
    email: result.email,
    password: result.password,
  });

  try {
    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await refreshAccessToken(savedUser.id);
    res.status(201).json({accessToken, refreshToken});
  } catch (err) {
    res.status(400).send(err);
  }
}


async function loginController(req, res){
   const result = await loginSchema.validateAsync(req.body);

   const user = await userModel.findOne({email:result.email});

   if(!user) return res.status(400).send("email not exist")

   const validPass = await user.isValidPassword(result.password);
   if(!validPass){throw createError.Unauthorized()}

   res.status(200).send(user)

} 

module.exports = { registerController, loginController };
