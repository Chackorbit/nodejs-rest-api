const { User } = require("../../models");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, imageName);

  try {
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);
    Jimp.read(avatarURL)
      .then((avatar) => {
        return avatar
          .resize(250, 250) // resize
          .quality(60) // set JPEG quality
          .write(avatarURL); // save
      })
      .catch((err) => {
        console.error(err);
      });

    await User.findByIdAndUpdate(id, { avatarURL });

    res.json({
      avatarURL: avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
