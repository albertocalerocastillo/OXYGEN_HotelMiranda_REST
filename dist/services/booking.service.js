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
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBooking = exports.getBookings = void 0;
const fs = __importStar(require("fs"));
const BOOKINGS_FILE = './src/data/bookings.json';
const getBookings = async () => {
    try {
        const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al leer el archivo de reservas');
    }
};
exports.getBookings = getBookings;
const getBooking = async (id) => {
    try {
        const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
        const bookings = JSON.parse(data);
        return bookings.find(b => b.id === id);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al leer el archivo de reservas');
    }
};
exports.getBooking = getBooking;
const createBooking = async (booking) => {
    try {
        const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
        const bookings = JSON.parse(data);
        bookings.push(booking);
        await fs.promises.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al crear la reserva');
    }
};
exports.createBooking = createBooking;
const updateBooking = async (id, updatedBooking) => {
    try {
        const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
        const bookings = JSON.parse(data);
        const index = bookings.findIndex(b => b.id === id);
        if (index === -1) {
            throw new Error('Reserva no encontrada');
        }
        bookings[index] = { ...bookings[index], ...updatedBooking };
        await fs.promises.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al actualizar la reserva');
    }
};
exports.updateBooking = updateBooking;
const deleteBooking = async (id) => {
    try {
        const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
        const bookings = JSON.parse(data);
        const updatedBookings = bookings.filter(b => b.id !== id);
        await fs.promises.writeFile(BOOKINGS_FILE, JSON.stringify(updatedBookings, null, 2));
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al eliminar la reserva');
    }
};
exports.deleteBooking = deleteBooking;
