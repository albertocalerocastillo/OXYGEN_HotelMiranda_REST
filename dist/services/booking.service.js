"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const fs = __importStar(require("fs"));
const BOOKINGS_FILE = './src/data/bookings.json';
const ROOMS_FILE = './src/data/rooms.json';
class BookingService {
    async getBookings() {
        try {
            const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error(error);
            throw new Error('Error al leer el archivo de reservas');
        }
    }
    async getBooking(id) {
        try {
            const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
            const bookings = JSON.parse(data);
            return bookings.find(b => b.id === id);
        }
        catch (error) {
            console.error(error);
            throw new Error('Error al leer el archivo de reservas');
        }
    }
    async createBooking(booking) {
        try {
            const bookingData = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
            const bookings = JSON.parse(bookingData);
            const roomData = await fs.promises.readFile(ROOMS_FILE, 'utf8');
            const rooms = JSON.parse(roomData);
            const room = rooms.find(r => r.id === booking.room.id);
            if (!room) {
                throw new Error('La habitación especificada no existe');
            }
            booking.room = room;
            bookings.push(booking);
            await fs.promises.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
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
            const bookingData = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
            const bookings = JSON.parse(bookingData);
            const roomData = await fs.promises.readFile(ROOMS_FILE, 'utf8');
            const rooms = JSON.parse(roomData);
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
            const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
            const bookings = JSON.parse(data);
            const updatedBookings = bookings.filter(b => b.id !== id);
            await fs.promises.writeFile(BOOKINGS_FILE, JSON.stringify(updatedBookings, null, 2));
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
