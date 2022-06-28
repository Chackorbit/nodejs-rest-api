const { User } = require("../models");
const { BadRequest } = require("http-errors");

const subscription = async (req, res, next) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  if (
    subscription === "starter" ||
    subscription === "pro" ||
    subscription === "business"
  ) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id },
        { subscription: subscription },
        { new: true }
      );

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    throw new BadRequest("Invalid value subscription");
  }
};

module.exports = subscription;
