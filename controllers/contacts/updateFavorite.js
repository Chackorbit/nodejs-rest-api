const { Contact } = require("../../models");

const updateFavorite = async (req, res, next) => {
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    { favorite },
    { new: true }
  );

  if (!result) {
    return res.status(404).json({
      message: `Not found`,
    });
  }

  res.status(200).json(result);
};

module.exports = updateFavorite;
