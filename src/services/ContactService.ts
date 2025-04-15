import { Contact } from '../interfaces/ContactInterface';
import { connect } from '../../db';

class ContactService {
    async archiveContact(id: string, archived: boolean): Promise<void> {
        try {
            const connection = await connect();
            await connection.execute(
                'UPDATE contacts SET archived = ? WHERE id = ?',
                [archived, id]
            );
            connection.release();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error(`Error al ${archived ? 'archivar' : 'desarchivar'} el contacto: ` + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error(`Error al ${archived ? 'archivar' : 'desarchivar'} el contacto: Ha ocurrido un error inesperado`);
            }
        }
    }

    async getContacts(): Promise<Contact[]> {
        try {
            const connection = await connect();
            const [rows] = await connection.execute('SELECT * FROM contacts');
            connection.release();
            return rows as Contact[];
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
}

export const contactService = new ContactService();