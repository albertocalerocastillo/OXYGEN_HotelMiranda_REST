import { Booking } from '../interfaces/booking.interface';
import { Room } from '../interfaces/room.interface';
import * as fs from 'fs';

const BOOKINGS_FILE = './src/data/bookings.json';
const ROOMS_FILE = './src/data/rooms.json';

class BookingService {
    async getBookings(): Promise<Booking[]> {
        try {
            const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(error);
            throw new Error('Error al leer el archivo de reservas');
        }
    }

    async getBooking(id: string): Promise<Booking | undefined> {
        try {
            const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
            const bookings: Booking[] = JSON.parse(data);
            return bookings.find(b => b.id === id);
        } catch (error) {
            console.error(error);
            throw new Error('Error al leer el archivo de reservas');
        }
    }

    async createBooking(booking: Booking): Promise<void> {
        try {
            const bookingData = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
            const bookings: Booking[] = JSON.parse(bookingData);

            const roomData = await fs.promises.readFile(ROOMS_FILE, 'utf8');
            const rooms: Room[] = JSON.parse(roomData);
            const room = rooms.find(r => r.id === booking.room.id);

            if (!room) {
                throw new Error('La habitación especificada no existe');
            }

            booking.room = room;
            bookings.push(booking);
            await fs.promises.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
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

    async updateBooking(id: string, updatedBooking: Booking): Promise<void> {
        try {
            const bookingData = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
            const bookings: Booking[] = JSON.parse(bookingData);

            const roomData = await fs.promises.readFile(ROOMS_FILE, 'utf8');
            const rooms: Room[] = JSON.parse(roomData);

            const room = rooms.find(r => r.id === updatedBooking.room.id);
            if (!room) {
                throw new Error('La habitación especificada no existe');
            }

            const index = bookings.findIndex(b => b.id === id);
            if (index === -1) {
                throw new Error('Reserva no encontrada');
            }

            updatedBooking.room = room;
            bookings[index] = { ...bookings[index], ...updatedBooking };
            await fs.promises.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
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
            const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
            const bookings: Booking[] = JSON.parse(data);
            const updatedBookings = bookings.filter(b => b.id !== id);
            await fs.promises.writeFile(BOOKINGS_FILE, JSON.stringify(updatedBookings, null, 2));
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