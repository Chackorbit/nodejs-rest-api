const { Contact } = require("../../models");

const removeById = async (req, res, next) => {
  const result = await Contact.findByIdAndRemove(req.params.contactId);
  if (result === null) {
    return res.status(404).json({ status: 404, message: "Not found contact" });
  }
  res
    .status(200)
    .json({ status: 200, message: "contact deleted", data: { result } });
};

module.exports = removeById;
