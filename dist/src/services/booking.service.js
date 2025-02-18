"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const booking_model_1 = require("../models/booking.model");
const room_model_1 = require("../models/room.model");
class BookingService {
    async getBookings() {
        try {
            return await booking_model_1.BookingModel.find().populate('room');
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
            return await booking_model_1.BookingModel.findById(id).populate('room');
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
            const room = await room_model_1.RoomModel.findById(booking.room);
            if (!room) {
                throw new Error('La habitación especificada no existe');
            }
            const newBooking = new booking_model_1.BookingModel({ ...booking, room: room._id });
            return await newBooking.save();
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
            const room = await room_model_1.RoomModel.findById(updatedBooking.room);
            if (!room) {
                throw new Error('La habitación especificada no existe');
            }
            return await booking_model_1.BookingModel.findByIdAndUpdate(id, { ...updatedBooking, room: room._id }, { new: true }).populate('room');
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
            await booking_model_1.BookingModel.findByIdAndDelete(id);
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
