"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_1 = require("../../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    async getUsers() {
        try {
            const connection = await (0, db_1.connect)();
            const [rows] = await connection.execute('SELECT id, name, email, jobDesk, contact, status, profilePhoto, password, joinDate FROM users');
            connection.release();
            return rows;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al obtener los usuarios: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al obtener los usuarios: Ha ocurrido un error inesperado');
            }
        }
    }
    async getUser(id) {
        try {
            const connection = await (0, db_1.connect)();
            const [rows] = await connection.execute('SELECT id, name, email, jobDesk, contact, status, profilePhoto, password, joinDate FROM users WHERE id = ?', [id]);
            connection.release();
            return rows.length > 0 ? rows[0] : null;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al obtener el usuario: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al obtener el usuario: Ha ocurrido un error inesperado');
            }
        }
    }
    async createUser(user) {
        try {
            if (!user.password) {
                throw new Error('La contraseña del usuario no está definida');
            }
            const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
            const connection = await (0, db_1.connect)();
            const { name, email, jobDesk, contact, status, profilePhoto } = user;
            const [result] = await connection.execute('INSERT INTO users (name, email, password, jobDesk, contact, status, profilePhoto) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, email, hashedPassword, jobDesk, contact, status, profilePhoto]);
            const insertedId = result.insertId;
            connection.release();
            return { ...user, id: insertedId, password: hashedPassword };
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al crear el usuario: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al crear el usuario: Ha ocurrido un error inesperado');
            }
        }
    }
    async updateUser(id, updatedUser) {
        try {
            const connection = await (0, db_1.connect)();
            const { name, email, jobDesk, contact, status, profilePhoto } = updatedUser;
            await connection.execute('UPDATE users SET name = ?, email = ?, jobDesk = ?, contact = ?, status = ?, profilePhoto = ? WHERE id = ?', [name, email, jobDesk, contact, status, profilePhoto, id]);
            connection.release();
            return updatedUser;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al actualizar el usuario: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al actualizar el usuario: Ha ocurrido un error inesperado');
            }
        }
    }
    async deleteUser(id) {
        try {
            const connection = await (0, db_1.connect)();
            await connection.execute('DELETE FROM users WHERE id = ?', [id]);
            connection.release();
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al eliminar el usuario: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al eliminar el usuario: Ha ocurrido un error inesperado');
            }
        }
    }
}
exports.userService = new UserService();
