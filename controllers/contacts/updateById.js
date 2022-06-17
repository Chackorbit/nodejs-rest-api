const { Contact } = require("../../models");

const updateById = async (req, res, next) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );

  if (!result) {
    return res.status(404).json({
      message: `Not found`,
    });
  }

  res.status(200).json(result);
};

module.exports = updateById;
