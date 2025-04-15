import { Booking } from '../interfaces/BookingInterface';
import { connect } from '../../db';
import { RowDataPacket } from 'mysql2';

class BookingService {
    async getBookings(): Promise<Booking[]> {
        try {
            const connection = await connect();
            const [rows] = await connection.execute(`
                SELECT bookings.*, rooms.name AS roomName
                FROM bookings
                INNER JOIN rooms ON bookings.roomId = rooms.id
            `);
            connection.release();
            return rows as Booking[];
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al obtener las reservas: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al obtener las reservas: Ha ocurrido un error inesperado');
            }
        }
    }

    async getBooking(id: string): Promise<Booking | null> {
        try {
            const connection = await connect();
            const [rows] = await connection.execute(`
                SELECT bookings.*, rooms.name AS roomName
                FROM bookings
                INNER JOIN rooms ON bookings.roomId = rooms.id
                WHERE bookings.id = ?
            `, [id]);
            connection.release();

            return (rows as RowDataPacket[]).length > 0 ? (rows as RowDataPacket[])[0] as Booking : null;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al obtener la reserva: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al obtener la reserva: Ha ocurrido un error inesperado');
            }
        }
    }

    async createBooking(booking: Booking): Promise<Booking> {
        try {
            const connection = await connect();
            const [roomRows] = await connection.execute('SELECT * FROM rooms WHERE id = ?', [booking.room]);
            if ((roomRows as RowDataPacket[]).length === 0) {
                throw new Error('La habitación especificada no existe');
            }

            const { guest, orderDate, checkInDate, checkInTime, checkOutDate, checkOutTime, specialRequest, room, status, specialRequestType } = booking;
            const [result] = await connection.execute(
                'INSERT INTO bookings (guest, orderDate, checkInDate, checkInTime, checkOutDate, checkOutTime, specialRequest, roomId, status, specialRequestType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [guest, orderDate, checkInDate, checkInTime, checkOutDate, checkOutTime, specialRequest, room, status, specialRequestType]
            );
            const insertedId = (result as any).insertId;
            connection.release();
            return { ...booking, id: insertedId };
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al crear la reserva: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al crear la reserva: Ha ocurrido un error inesperado');
            }
        }
    }

    async updateBooking(id: string, updatedBooking: Booking): Promise<Booking | null> {
        try {
            const connection = await connect();
            const [roomRows] = await connection.execute('SELECT * FROM rooms WHERE id = ?', [updatedBooking.room]);
            if ((roomRows as RowDataPacket[]).length === 0) {
                throw new Error('La habitación especificada no existe');
            }

            const { guest, orderDate, checkInDate, checkInTime, checkOutDate, checkOutTime, specialRequest, room, status, specialRequestType } = updatedBooking;
            await connection.execute(
                'UPDATE bookings SET guest = ?, orderDate = ?, checkInDate = ?, checkInTime = ?, checkOutDate = ?, checkOutTime = ?, specialRequest = ?, roomId = ?, status = ?, specialRequestType = ? WHERE id = ?',
                [guest, orderDate, checkInDate, checkInTime, checkOutDate, checkOutTime, specialRequest, room, status, specialRequestType, id]
            );
            connection.release();
            return updatedBooking;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al actualizar la reserva: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al actualizar la reserva: Ha ocurrido un error inesperado');
            }
        }
    }

    async deleteBooking(id: string): Promise<void> {
        try {
            const connection = await connect();
            await connection.execute('DELETE FROM bookings WHERE id = ?', [id]);
            connection.release();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al eliminar la reserva: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al eliminar la reserva: Ha ocurrido un error inesperado');
            }
        }
    }
}

export const bookingService = new BookingService();