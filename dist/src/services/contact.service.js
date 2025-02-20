"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = void 0;
const contact_model_1 = require("../models/contact.model");
class ContactService {
    async getContacts() {
        try {
            return await contact_model_1.ContactModel.find();
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al obtener los contactos: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al obtener los contactos: Ha ocurrido un error inesperado');
            }
        }
    }
    async getContact(id) {
        try {
            return await contact_model_1.ContactModel.findById(id);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al obtener el contacto: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al obtener el contacto: Ha ocurrido un error inesperado');
            }
        }
    }
    async createContact(contact) {
        try {
            const newContact = new contact_model_1.ContactModel(contact);
            return await newContact.save();
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al crear el contacto: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al crear el contacto: Ha ocurrido un error inesperado');
            }
        }
    }
    async updateContact(id, updatedContact) {
        try {
            return await contact_model_1.ContactModel.findByIdAndUpdate(id, updatedContact, { new: true });
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al actualizar el contacto: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al actualizar el contacto: Ha ocurrido un error inesperado');
            }
        }
    }
    async deleteContact(id) {
        try {
            await contact_model_1.ContactModel.findByIdAndDelete(id);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al eliminar el contacto: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al eliminar el contacto: Ha ocurrido un error inesperado');
            }
        }
    }
}
exports.contactService = new ContactService();
