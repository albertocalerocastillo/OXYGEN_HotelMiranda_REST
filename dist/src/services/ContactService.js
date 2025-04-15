"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = void 0;
const db_1 = require("../../db");
class ContactService {
    async archiveContact(id, archived) {
        try {
            const connection = await (0, db_1.connect)();
            await connection.execute('UPDATE contacts SET archived = ? WHERE id = ?', [archived, id]);
            connection.release();
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error(`Error al ${archived ? 'archivar' : 'desarchivar'} el contacto: ` + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error(`Error al ${archived ? 'archivar' : 'desarchivar'} el contacto: Ha ocurrido un error inesperado`);
            }
        }
    }
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
}
exports.contactService = new ContactService();
