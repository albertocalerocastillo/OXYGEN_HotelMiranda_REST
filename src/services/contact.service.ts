import { Contact } from '../interfaces/contact.interface';
import * as fs from 'fs';

const CONTACTS_FILE = './src/data/contact.json';

//hacerlo con clases

export const getContacts = async (): Promise<Contact[]> => {
  try {
    const data = await fs.promises.readFile(CONTACTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    throw new Error('Error al leer el archivo de contactos');
  }
};

export const getContact = async (id: string): Promise<Contact | undefined> => {
  try {
    const data = await fs.promises.readFile(CONTACTS_FILE, 'utf8');
    const contacts: Contact[] = JSON.parse(data);
    return contacts.find(c => c.id === id);
  } catch (error) {
    console.error(error);
    throw new Error('Error al leer el archivo de contactos');
  }
};

export const createContact = async (contact: Contact): Promise<void> => {
  try {
    const data = await fs.promises.readFile(CONTACTS_FILE, 'utf8');
    const contacts: Contact[] = JSON.parse(data);
    contacts.push(contact);
    await fs.promises.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el contacto');
  }
};

export const updateContact = async (id: string, updatedContact: Contact): Promise<void> => {
  try {
    const data = await fs.promises.readFile(CONTACTS_FILE, 'utf8');
    const contacts: Contact[] = JSON.parse(data);

    const index = contacts.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Contacto no encontrado');
    }

    contacts[index] = { ...contacts[index], ...updatedContact };
    await fs.promises.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el contacto');
  }
};

export const deleteContact = async (id: string): Promise<void> => {
  try {
    const data = await fs.promises.readFile(CONTACTS_FILE, 'utf8');
    const contacts: Contact[] = JSON.parse(data);
    const updatedContacts = contacts.filter(c => c.id !== id);
    await fs.promises.writeFile(CONTACTS_FILE, JSON.stringify(updatedContacts, null, 2));
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el contacto');
  }
};