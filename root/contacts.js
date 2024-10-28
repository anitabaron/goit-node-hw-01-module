import * as fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.resolve(__dirname, "../db/contacts.json");

export const listContacts = async () => {
  try {
    const dataJson = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(dataJson);
    console.table(contacts);
    return contacts;
  } catch (err) {
    console.error("Błąd odczytu listy ", err);
  }
};

export const getContactById = async (contactId) => {
  try {
    const dataJson = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(dataJson);
    const contact = contacts.find((contact) => contact.id === contactId);
    if (contact) {
      console.table(contact);
      return contact;
    } else {
      console.log(`Kontakt id:${contactId} nie został znaleziony.`);
      return null;
    }
  } catch (err) {
    console.error("Błąd odnalezienia kontaktu ", err);
  }
};

export const removeContact = async (contactId) => {
  try {
    const dataJson = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(dataJson);
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      "utf-8"
    );

    console.log(`Kontakt o id ${contactId} został usunięty.`);
  } catch (err) {
    console.error("Błąd usuwania kontaktu ", err);
  }
};

export const addContact = async (name, email, phone) => {
  try {
    const dataJson = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(dataJson);
    const id = uuidv4();
    const newContact = { id, name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Kontakt dodany:", newContact);
    return newContact;
  } catch (err) {
    console.error("Błąd dodawania kontaktu ", err);
  }
};
