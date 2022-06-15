const express = require("express");
const Joi = require("joi");

const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();

  res.status(200).json({ status: "success", data: contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const findContact = await getContactById(req.params.contactId);

  if (!findContact) {
    return res.status(404).json({
      status: 404,
      message: `Not found contact with id ${req.params.contactId}!`,
    });
  }

  res.status(200).json(findContact);
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),

    phone: Joi.number().required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: "missing required name field",
      status: validationResult.error.details,
      code: 400,
    });
  }

  const newContact = await addContact(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const remove = await removeContact(req.params.contactId);
  if (remove === null) {
    return res.status(404).json({ status: 404, message: "Not found contact" });
  }
  res.status(200).json({ status: 200, message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  if (!req.body.name ?? !req.body.email ?? !req.body.phone) {
    return res.status(400).json({ message: "missing fields" });
  }
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).optional(),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .optional(),
    phone: Joi.number().optional(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      status: validationResult.error.details,
      code: 400,
    });
  }

  const findContact = await getContactById(req.params.contactId);
  if (!findContact) {
    return res.status(404).json({
      message: `Not found`,
    });
  }

  const currentContact = await updateContact(req.params.contactId, req.body);

  res.status(200).json(currentContact);
});

module.exports = router;
