const Joi = require("joi");
const { Schema, model } = require("mongoose");

const userShema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const User = model("user", userShema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
