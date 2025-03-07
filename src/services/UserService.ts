import { User } from '../interfaces/UserInterface';
import { connect } from '../../db';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';

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

    async createUser(user: User): Promise<User> {
        try {
            if (!user.password) {
                throw new Error('La contraseña del usuario no está definida');
            }
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const connection = await connect();
            const { name, email, jobDesk, contact, status, profilePhoto } = user;
            const [result] = await connection.execute(
                'INSERT INTO users (name, email, password, jobDesk, contact, status, profilePhoto) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [name, email, hashedPassword, jobDesk, contact, status, profilePhoto]
            );
            const insertedId = (result as any).insertId;
            connection.release();
            return { ...user, id: insertedId, password: hashedPassword };
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
            const { name, email, jobDesk, contact, status, profilePhoto } = updatedUser;
            await connection.execute(
                'UPDATE users SET name = ?, email = ?, jobDesk = ?, contact = ?, status = ?, profilePhoto = ? WHERE id = ?',
                [name, email, jobDesk, contact, status, profilePhoto, id]
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