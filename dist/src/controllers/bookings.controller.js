"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingEndpoint = exports.bookingRoutes = exports.deleteBookingController = exports.updateBookingController = exports.createBookingController = exports.getBookingController = exports.getBookingsController = void 0;
const express_1 = __importDefault(require("express"));
const booking_service_1 = require("../services/booking.service");
const room_service_1 = require("../services/room.service");
const booking_validator_1 = require("../validators/booking.validator");
const uuid_1 = require("uuid");
/**
 * Función para manejar errores y enviar respuestas con código de error 500
 * @param res
 * @param error
 */
const handleErrors = (res, error) => {
    if (error instanceof Error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
    else {
        console.error('Error desconocido:', error);
        res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
    }
};
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
        const bookings = await booking_service_1.bookingService.getBookings();
        res.json(bookings);
    }
    catch (error) {
        handleErrors(res, error);
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
        const booking = await booking_service_1.bookingService.getBooking(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.json(booking);
    }
    catch (error) {
        handleErrors(res, error);
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
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error del servidor
 */
const createBookingController = async (req, res) => {
    try {
        const { error } = booking_validator_1.validateBookingCreate.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const bookingData = req.body;
        const room = await room_service_1.roomService.getRoom(bookingData.room.id);
        if (!room) {
            return res.status(400).json({ message: 'La habitación especificada no existe' });
        }
        const booking = { ...bookingData, room: room, id: (0, uuid_1.v4)() };
        await booking_service_1.bookingService.createBooking(booking);
        res.status(201).json({ message: 'Reserva creada con éxito' });
    }
    catch (error) {
        handleErrors(res, error);
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
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error del servidor
 */
const updateBookingController = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedBookingData = req.body;
        const room = await room_service_1.roomService.getRoom(updatedBookingData.room.id);
        if (!room) {
            return res.status(400).json({ message: 'La habitación especificada no existe' });
        }
        const updatedBooking = { ...updatedBookingData, room: room };
        await booking_service_1.bookingService.updateBooking(id, updatedBooking);
        res.status(200).json({ message: 'Reserva actualizada con éxito' });
    }
    catch (error) {
        handleErrors(res, error);
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
        await booking_service_1.bookingService.deleteBooking(id);
        res.status(200).json({ message: 'Reserva eliminada con éxito' });
    }
    catch (error) {
        handleErrors(res, error);
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
