"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomEndpoint = exports.roomRoutes = exports.deleteRoomController = exports.updateRoomController = exports.createRoomController = exports.getRoomController = exports.getRoomsController = void 0;
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const room_service_1 = require("../services/room.service");
const room_middleware_1 = require("../middleware/room.middleware");
/**
 * Función para manejar errores y enviar respuestas con código de error 500
 * @param res
 * @param error
 */
const handleErrors = (res, error) => {
    if (error instanceof Error) {
        console.error(error.message);
        if (error.message === 'Habitación no encontrada') {
            res.status(404).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error.message });
        }
    }
    else {
        console.error('Error desconocido:', error);
        res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
    }
};
/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Operaciones relacionadas con las habitaciones
 */
/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Obtiene todas las habitaciones
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Lista de habitaciones
 *       500:
 *         description: Error del servidor
 */
const getRoomsController = async (req, res) => {
    try {
        const rooms = await (0, room_service_1.getRooms)();
        res.json(rooms);
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.getRoomsController = getRoomsController;
/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Obtiene una habitación por ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la habitación
 *     responses:
 *       200:
 *         description: Datos de la habitación
 *       404:
 *         description: Habitación no encontrada
 *       500:
 *         description: Error del servidor
 */
const getRoomController = async (req, res) => {
    try {
        const room = await (0, room_service_1.getRoom)(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }
        res.json(room);
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.getRoomController = getRoomController;
/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Crea una nueva habitación
 *     tags: [Rooms]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define las propiedades del objeto de habitación aquí
 *     responses:
 *       201:
 *         description: Habitación creada con éxito
 *       500:
 *         description: Error del servidor
 */
const createRoomController = async (req, res) => {
    try {
        const roomData = req.body;
        const defaultRoom = {
            photo: "",
            number: "",
            name: "",
            type: "",
            amenities: "",
            price: 0,
            offerPrice: 0,
            status: "",
            description: "",
            capacity: 0,
        };
        const newRoom = { ...defaultRoom, ...roomData, id: (0, uuid_1.v4)() };
        const createdRoom = await (0, room_service_1.createRoom)(newRoom);
        res.status(201).json({ message: 'Habitación creada con éxito', id: createdRoom.id });
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.createRoomController = createRoomController;
/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     summary: Actualiza una habitación existente
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la habitación
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define las propiedades del objeto de habitación aquí
 *     responses:
 *       200:
 *         description: Habitación actualizada con éxito
 *       404:
 *         description: Habitación no encontrada
 *       500:
 *         description: Error del servidor
 */
const updateRoomController = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedRoom = req.body;
        await (0, room_service_1.updateRoom)(id, updatedRoom);
        res.status(200).json({ message: 'Habitación actualizada con éxito' });
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.updateRoomController = updateRoomController;
/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     summary: Elimina una habitación
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la habitación
 *     responses:
 *       200:
 *         description: Habitación eliminada con éxito
 *       404:
 *         description: Habitación no encontrada
 *       500:
 *         description: Error del servidor
 */
const deleteRoomController = async (req, res) => {
    try {
        const id = req.params.id;
        await (0, room_service_1.deleteRoom)(id);
        res.status(200).json({ message: 'Habitación eliminada con éxito' });
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.deleteRoomController = deleteRoomController;
const router = express_1.default.Router();
router.get('/', exports.getRoomsController);
router.get('/:id', exports.getRoomController);
router.post('/', room_middleware_1.validateCreateRoom, exports.createRoomController);
router.put('/:id', room_middleware_1.validateUpdateRoom, exports.updateRoomController);
router.delete('/:id', exports.deleteRoomController);
exports.roomRoutes = router;
exports.roomEndpoint = {
    path: '/rooms',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    private: true
};
