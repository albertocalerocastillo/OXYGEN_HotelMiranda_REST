import { User } from '../interfaces/UserInterface';
import { connect } from '../../db';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class UserService {
    async getUsers(): Promise<User[]> {
        try {
            const connection = await connect();
            const [rows] = await connection.execute('SELECT id, name, email, jobDesk, contact, status, profilePhoto, password, joinDate FROM users');
            connection.release();
            return rows as User[];
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al obtener los usuarios: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al obtener los usuarios: Ha ocurrido un error inesperado');
            }
        }
    }

    async getUser(id: string): Promise<User | null> {
        try {
            const connection = await connect();
            const [rows] = await connection.execute('SELECT id, name, email, jobDesk, contact, status, profilePhoto, password, joinDate FROM users WHERE id = ?', [id]);
            connection.release();
            return (rows as RowDataPacket[]).length > 0 ? (rows as RowDataPacket[])[0] as User : null;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al obtener el usuario: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al obtener el usuario: Ha ocurrido un error inesperado');
            }
        }
    }

    async createUser(user: Omit<User, 'id'>): Promise<User> {
        try {
            if (!user.password) {
                throw new Error('La contraseña del usuario no está definida');
            }
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const connection = await connect();
            const id = uuidv4();
            const { name, email, jobDesk, contact, status, profilePhoto, joinDate } = user;
            const [result] = await connection.execute(
                'INSERT INTO users (id, name, email, password, jobDesk, contact, status, profilePhoto, joinDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [id, name, email, hashedPassword, jobDesk, contact, status, profilePhoto, joinDate]
            );
            connection.release();
            return { id, ...user, password: hashedPassword };
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al crear el usuario: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al crear el usuario: Ha ocurrido un error inesperado');
            }
        }
    }

    async updateUser(id: string, updatedUser: User): Promise<User | null> {
        try {
            const connection = await connect();
            const { name, email, jobDesk, contact, status, profilePhoto, joinDate } = updatedUser;
            await connection.execute(
                'UPDATE users SET name = ?, email = ?, jobDesk = ?, contact = ?, status = ?, profilePhoto = ?, joinDate = ? WHERE id = ?',
                [name, email, jobDesk, contact, status, profilePhoto, joinDate, id]
            );
            connection.release();
            return updatedUser;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al actualizar el usuario: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al actualizar el usuario: Ha ocurrido un error inesperado');
            }
        }
    }

    async deleteUser(id: string): Promise<void> {
        try {
            const connection = await connect();
            await connection.execute('DELETE FROM users WHERE id = ?', [id]);
            connection.release();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al eliminar el usuario: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al eliminar el usuario: Ha ocurrido un error inesperado');
            }
        }
    }
}

export const userService = new UserService();