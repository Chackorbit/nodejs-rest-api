const { Contact } = require("../../models");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const findContact = await Contact.findById(contactId);

  if (!findContact) {
    return res.status(404).json({
      status: 404,
      message: `Not found contact with id ${req.params.contactId}!`,
    });
  }

  res.status(200).json(findContact);
};

module.exports = getById;
