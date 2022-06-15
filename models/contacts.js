const fs = require("fs/promises");
const { v4 } = require("uuid");

const filePath = require("./filePath");

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);

  if (!result) {
    return null;
  }

  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const currentRemoveContact = await getContactById(contactId);
  if (!currentRemoveContact) {
    return null;
  }

  const remove = contacts.filter((item) => item.id !== contactId);
  await fs.writeFile(filePath, JSON.stringify(remove));
  return remove;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: v4() };

  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;

  contacts.forEach((contact) => {
    if (contact.id === contactId) {
      if (name) {
        contact.name = name;
      }
      if (email) {
        contact.email = email;
      }
      if (phone) {
        contact.phone = phone;
      }
    }
  });
  const currentContact = getContactById(contactId);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return currentContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
