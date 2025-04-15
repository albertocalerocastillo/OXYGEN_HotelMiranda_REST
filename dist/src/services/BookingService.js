"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const db_1 = require("../../db");
class BookingService {
    async getBookings() {
        try {
            const connection = await (0, db_1.connect)();
            const [rows] = await connection.execute(`
                SELECT bookings.*, rooms.name AS roomName
                FROM bookings
                INNER JOIN rooms ON bookings.roomId = rooms.id
            `);
            connection.release();
            return rows;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al obtener las reservas: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al obtener las reservas: Ha ocurrido un error inesperado');
            }
        }
    }
    async getBooking(id) {
        try {
            const connection = await (0, db_1.connect)();
            const [rows] = await connection.execute(`
                SELECT bookings.*, rooms.name AS roomName
                FROM bookings
                INNER JOIN rooms ON bookings.roomId = rooms.id
                WHERE bookings.id = ?
            `, [id]);
            connection.release();
            return rows.length > 0 ? rows[0] : null;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al obtener la reserva: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al obtener la reserva: Ha ocurrido un error inesperado');
            }
        }
    }
    async createBooking(booking) {
        try {
            const connection = await (0, db_1.connect)();
            const [roomRows] = await connection.execute('SELECT * FROM rooms WHERE id = ?', [booking.room]);
            if (roomRows.length === 0) {
                throw new Error('La habitación especificada no existe');
            }
            const { guest, orderDate, checkInDate, checkInTime, checkOutDate, checkOutTime, specialRequest, room, status, specialRequestType } = booking;
            const [result] = await connection.execute('INSERT INTO bookings (guest, orderDate, checkInDate, checkInTime, checkOutDate, checkOutTime, specialRequest, roomId, status, specialRequestType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [guest, orderDate, checkInDate, checkInTime, checkOutDate, checkOutTime, specialRequest, room, status, specialRequestType]);
            const insertedId = result.insertId;
            connection.release();
            return { ...booking, id: insertedId };
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al crear la reserva: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al crear la reserva: Ha ocurrido un error inesperado');
            }
        }
    }
    async updateBooking(id, updatedBooking) {
        try {
            const connection = await (0, db_1.connect)();
            const [roomRows] = await connection.execute('SELECT * FROM rooms WHERE id = ?', [updatedBooking.room]);
            if (roomRows.length === 0) {
                throw new Error('La habitación especificada no existe');
            }
            const { guest, orderDate, checkInDate, checkInTime, checkOutDate, checkOutTime, specialRequest, room, status, specialRequestType } = updatedBooking;
            await connection.execute('UPDATE bookings SET guest = ?, orderDate = ?, checkInDate = ?, checkInTime = ?, checkOutDate = ?, checkOutTime = ?, specialRequest = ?, roomId = ?, status = ?, specialRequestType = ? WHERE id = ?', [guest, orderDate, checkInDate, checkInTime, checkOutDate, checkOutTime, specialRequest, room, status, specialRequestType, id]);
            connection.release();
            return updatedBooking;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al actualizar la reserva: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al actualizar la reserva: Ha ocurrido un error inesperado');
            }
        }
    }
    async deleteBooking(id) {
        try {
            const connection = await (0, db_1.connect)();
            await connection.execute('DELETE FROM bookings WHERE id = ?', [id]);
            connection.release();
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al eliminar la reserva: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al eliminar la reserva: Ha ocurrido un error inesperado');
            }
        }
    }
}
exports.bookingService = new BookingService();
