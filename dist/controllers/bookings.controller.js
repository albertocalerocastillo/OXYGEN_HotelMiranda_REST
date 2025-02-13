"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingEndpoint = exports.bookingRoutes = exports.deleteBookingController = exports.updateBookingController = exports.createBookingController = exports.getBookingController = exports.getBookingsController = void 0;
const express_1 = __importDefault(require("express"));
const booking_service_1 = require("../services/booking.service");
/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Operaciones relacionadas con las reservas
 */
/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Obtiene todas las reservas
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: Lista de reservas
 *       500:
 *         description: Error del servidor
 */
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
/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Obtiene una reserva por ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Datos de la reserva
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error del servidor
 */
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
/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Crea una nueva reserva
 *     tags: [Bookings]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define las propiedades del objeto de reserva aquí
 *     responses:
 *       201:
 *         description: Reserva creada con éxito
 *       500:
 *         description: Error del servidor
 */
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
/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Actualiza una reserva existente
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la reserva
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define las propiedades del objeto de reserva aquí
 *     responses:
 *       200:
 *         description: Reserva actualizada con éxito
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error del servidor
 */
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
/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Elimina una reserva
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Reserva eliminada con éxito
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error del servidor
 */
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
