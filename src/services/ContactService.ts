import { Contact } from '../interfaces/ContactInterface';
import { connect } from '../../db';
import { RowDataPacket } from 'mysql2';

class ContactService {
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

    async getContact(id: string): Promise<Contact | null> {
        try {
            const connection = await connect();
            const [rows] = await connection.execute('SELECT * FROM contacts WHERE id = ?', [id]);
            connection.release();
            return (rows as RowDataPacket).length > 0 ? (rows as RowDataPacket)[0] as Contact : null;
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
            const connection = await connect();
            const { date, customer, email, phone, subject, comment, archived } = contact;
            const [result] = await connection.execute(
                'INSERT INTO contacts (date, customer, email, phone, subject, comment, archived) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [date, customer, email, phone, subject, comment, archived]
            );
            const insertedId = (result as any).insertId;
            connection.release();
            return { ...contact, id: insertedId };
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
            const connection = await connect();
            const { date, customer, email, phone, subject, comment, archived } = updatedContact;
            await connection.execute(
                'UPDATE contacts SET date = ?, customer = ?, email = ?, phone = ?, subject = ?, comment = ?, archived = ? WHERE id = ?',
                [date, customer, email, phone, subject, comment, archived, id]
            );
            connection.release();
            return updatedContact;
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
            const connection = await connect();
            await connection.execute('DELETE FROM contacts WHERE id = ?', [id]);
            connection.release();
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