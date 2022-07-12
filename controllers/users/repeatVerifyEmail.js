const { User } = require("../../models");
const { BadRequest } = require("http-errors");
const { sendEmail } = require("../../sendgrid");

const repeatVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest("missing required field email");
  }
  const { verify, verificationToken } = await User.findOne({ email });
  if (!verify) {
    const mail = {
      to: email,
      subject: "Подтверждение email!",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить Email</a>`,
    };
    await sendEmail(mail);

    res.json({
      message: "Verification email sent",
    });
  }

  if (verify) {
    throw new BadRequest("Verification has already been passed");
  }
};

module.exports = repeatVerifyEmail;
