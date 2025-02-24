import { Booking } from '../interfaces/BookingInterface';
import { BookingModel } from '../models/BookingModel';
import { RoomModel } from '../models/RoomModel';

class BookingService {
    async getBookings(): Promise<Booking[]> {
        try {
            return await BookingModel.find().populate('room');
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
            return await BookingModel.findById(id).populate('room');
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
            const room = await RoomModel.findById(booking.room);

            if (!room) {
                throw new Error('La habitación especificada no existe');
            }

            const newBooking = new BookingModel({ ...booking, room: room._id });
            return await newBooking.save();
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
            const room = await RoomModel.findById(updatedBooking.room);

            if (!room) {
                throw new Error('La habitación especificada no existe');
            }

            return await BookingModel.findByIdAndUpdate(
                id,
                { ...updatedBooking, room: room._id },
                { new: true }
            ).populate('room');
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
            await BookingModel.findByIdAndDelete(id);
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