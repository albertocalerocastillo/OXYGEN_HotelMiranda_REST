import { Contact } from '../interfaces/ContactInterface';
import { ContactModel } from '../models/ContactModel';

class ContactService {
    async getContacts(): Promise<Contact[]> {
        try {
            return await ContactModel.find();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al obtener los contactos: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al obtener los contactos: Ha ocurrido un error inesperado');
            }
        }
    }

    async getContact(id: string): Promise<Contact | null> {
        try {
            return await ContactModel.findById(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al obtener el contacto: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al obtener el contacto: Ha ocurrido un error inesperado');
            }
        }
    }

    async createContact(contact: Contact): Promise<Contact> {
        try {
            const newContact = new ContactModel(contact);
            return await newContact.save();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al crear el contacto: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al crear el contacto: Ha ocurrido un error inesperado');
            }
        }
    }

    async updateContact(id: string, updatedContact: Contact): Promise<Contact | null> {
        try {
            return await ContactModel.findByIdAndUpdate(id, updatedContact, { new: true });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al actualizar el contacto: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al actualizar el contacto: Ha ocurrido un error inesperado');
            }
        }
    }

    async deleteContact(id: string): Promise<void> {
        try {
            await ContactModel.findByIdAndDelete(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al eliminar el contacto: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al eliminar el contacto: Ha ocurrido un error inesperado');
            }
        }
    }
}

export const contactService = new ContactService();