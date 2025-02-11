"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingEndpoint = exports.bookingRoutes = exports.deleteBookingController = exports.updateBookingController = exports.createBookingController = exports.getBookingController = exports.getBookingsController = void 0;
const express_1 = __importDefault(require("express"));
const booking_service_1 = require("../services/booking.service");
const getBookingsController = async (req, res) => {
    try {
        const bookings = await (0, booking_service_1.getBookings)();
        res.json(bookings);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ message: error.message });
        }
        else {
            console.error('Error desconocido:', error);
            res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
        }
    }
};
exports.getBookingsController = getBookingsController;
const getBookingController = async (req, res) => {
    try {
        const booking = await (0, booking_service_1.getBooking)(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.json(booking);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ message: error.message });
        }
        else {
            console.error('Error desconocido:', error);
            res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
        }
    }
};
exports.getBookingController = getBookingController;
const createBookingController = async (req, res) => {
    try {
        const booking = req.body;
        await (0, booking_service_1.createBooking)(booking);
        res.status(201).json({ message: 'Reserva creada con éxito' });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ message: error.message });
        }
        else {
            console.error('Error desconocido:', error);
            res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
        }
    }
};
exports.createBookingController = createBookingController;
const updateBookingController = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedBooking = req.body;
        await (0, booking_service_1.updateBooking)(id, updatedBooking);
        res.status(200).json({ message: 'Reserva actualizada con éxito' });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ message: error.message });
        }
        else {
            console.error('Error desconocido:', error);
            res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
        }
    }
};
exports.updateBookingController = updateBookingController;
const deleteBookingController = async (req, res) => {
    try {
        const id = req.params.id;
        await (0, booking_service_1.deleteBooking)(id);
        res.status(200).json({ message: 'Reserva eliminada con éxito' });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ message: error.message });
        }
        else {
            console.error('Error desconocido:', error);
            res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
        }
    }
};
exports.deleteBookingController = deleteBookingController;
const router = express_1.default.Router();
router.get('/', exports.getBookingsController);
router.get('/:id', exports.getBookingController);
router.post('/', exports.createBookingController);
router.put('/:id', exports.updateBookingController);
router.delete('/:id', exports.deleteBookingController);
exports.bookingRoutes = router;
exports.bookingEndpoint = {
    path: '/bookings',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    private: true
};
