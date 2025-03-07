"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomService = void 0;
const db_1 = require("../../db");
class RoomService {
    async getRooms() {
        try {
            const connection = await (0, db_1.connect)();
            const [rows] = await connection.execute('SELECT * FROM rooms');
            connection.release();
            return rows;
        }
        catch (error) {
            console.error(error);
            throw new Error('Error al obtener las habitaciones');
        }
    }
    async getRoom(id) {
        try {
            const connection = await (0, db_1.connect)();
            const [rows] = await connection.execute('SELECT * FROM rooms WHERE id = ?', [id]);
            connection.release();
            const rowsData = rows;
            return rowsData.length > 0 ? rowsData[0] : null;
        }
        catch (error) {
            console.error(error);
            throw new Error('Error al obtener la habitación');
        }
    }
    async createRoom(room) {
        try {
            const connection = await (0, db_1.connect)();
            const { name, type, number, amenities, price, discount, offerPrice, photos, status, description, offer, cancellation } = room;
            const [result] = await connection.execute('INSERT INTO rooms (name, type, number, amenities, price, discount, offerPrice, photos, status, description, offer, cancellation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, type, number, amenities, price, discount, offerPrice, photos, status, description, offer, cancellation]);
            const insertedId = result.insertId;
            connection.release();
            return { ...room, id: insertedId };
        }
        catch (error) {
            console.error(error);
            throw new Error('Error al crear la habitación');
        }
    }
    async updateRoom(id, updatedRoom) {
        try {
            const connection = await (0, db_1.connect)();
            const { name, type, number, amenities, price, discount, offerPrice, photos, status, description, offer, cancellation } = updatedRoom;
            await connection.execute('UPDATE rooms SET name = ?, type = ?, number = ?, amenities = ?, price = ?, discount = ?, offerPrice = ?, photos = ?, status = ?, description = ?, offer = ?, cancellation = ? WHERE id = ?', [name, type, number, amenities, price, discount, offerPrice, photos, status, description, offer, cancellation, id]);
            connection.release();
            return updatedRoom;
        }
        catch (error) {
            console.error(error);
            throw new Error('Error al actualizar la habitación');
        }
    }
    async deleteRoom(id) {
        try {
            const connection = await (0, db_1.connect)();
            await connection.execute('DELETE FROM rooms WHERE id = ?', [id]);
            connection.release();
        }
        catch (error) {
            console.error(error);
            throw new Error('Error al eliminar la habitación');
        }
    }
}
exports.roomService = new RoomService();
