import express, { Request, Response } from 'express';
import { bookingService } from '../services/BookingService';
import { roomService } from '../services/RoomService';
import { validateBookingCreate } from '../validators/BookingValidator';
import { v4 as uuidv4 } from 'uuid';

/**
 * Función para manejar errores y enviar respuestas con código de error 500
 * @param res 
 * @param error 
 */
const handleErrors = (res: Response, error: unknown) => {
    if (error instanceof Error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    } else {
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
export const getBookingsController = async (req: Request, res: Response) => {
    try {
        const bookings = await bookingService.getBookings();
        res.json(bookings);
    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

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
export const getBookingController = async (req: Request, res: Response) => {
    try {
        const booking = await bookingService.getBooking(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.json(booking);
    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

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
export const createBookingController = async (req: Request, res: Response) => {
    try {
        const { error } = validateBookingCreate.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const bookingData = req.body;

        const room = await roomService.getRoom(bookingData.room.id);
        if (!room) {
            return res.status(400).json({ message: 'La habitación especificada no existe' });
        }

        const booking = { ...bookingData, room: room, id: uuidv4() };

        await bookingService.createBooking(booking);
        res.status(201).json({ message: 'Reserva creada con éxito' });
    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

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
export const updateBookingController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updatedBookingData = req.body;

        const room = await roomService.getRoom(updatedBookingData.room.id);
        if (!room) {
            return res.status(400).json({ message: 'La habitación especificada no existe' });
        }

        const updatedBooking = { ...updatedBookingData, room: room };

        await bookingService.updateBooking(id, updatedBooking);
        res.status(200).json({ message: 'Reserva actualizada con éxito' });
    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

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
export const deleteBookingController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await bookingService.deleteBooking(id);
        res.status(200).json({ message: 'Reserva eliminada con éxito' });
    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

const router = express.Router();

router.get('/', getBookingsController);
router.get('/:id', getBookingController);
router.post('/', createBookingController);
router.put('/:id', updateBookingController);
router.delete('/:id', deleteBookingController);

export const bookingRoutes = router;

export const bookingEndpoint = {
    path: '/bookings',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    private: true
};