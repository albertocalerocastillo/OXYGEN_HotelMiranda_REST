"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = void 0;
const db_1 = require("../../db");
class ContactService {
    async getContacts() {
        try {
            const connection = await (0, db_1.connect)();
            const [rows] = await connection.execute('SELECT * FROM contacts');
            connection.release();
            return rows;
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
            const connection = await (0, db_1.connect)();
            const [rows] = await connection.execute('SELECT * FROM contacts WHERE id = ?', [id]);
            connection.release();
            return rows.length > 0 ? rows[0] : null;
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
            const connection = await (0, db_1.connect)();
            const { date, customer, email, phone, subject, comment, archived } = contact;
            const [result] = await connection.execute('INSERT INTO contacts (date, customer, email, phone, subject, comment, archived) VALUES (?, ?, ?, ?, ?, ?, ?)', [date, customer, email, phone, subject, comment, archived]);
            const insertedId = result.insertId;
            connection.release();
            return { ...contact, id: insertedId };
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
            const connection = await (0, db_1.connect)();
            const { date, customer, email, phone, subject, comment, archived } = updatedContact;
            await connection.execute('UPDATE contacts SET date = ?, customer = ?, email = ?, phone = ?, subject = ?, comment = ?, archived = ? WHERE id = ?', [date, customer, email, phone, subject, comment, archived, id]);
            connection.release();
            return updatedContact;
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
            const connection = await (0, db_1.connect)();
            await connection.execute('DELETE FROM contacts WHERE id = ?', [id]);
            connection.release();
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
