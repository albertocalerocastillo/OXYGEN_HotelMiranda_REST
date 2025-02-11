"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomEndpoint = exports.roomRoutes = exports.deleteRoomController = exports.updateRoomController = exports.createRoomController = exports.getRoomController = exports.getRoomsController = void 0;
const express_1 = __importDefault(require("express"));
const room_service_1 = require("../services/room.service");
const getRoomsController = async (req, res) => {
    try {
        const rooms = await (0, room_service_1.getRooms)();
        res.json(rooms);
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
exports.getRoomsController = getRoomsController;
const getRoomController = async (req, res) => {
    try {
        const room = await (0, room_service_1.getRoom)(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }
        res.json(room);
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
exports.getRoomController = getRoomController;
const createRoomController = async (req, res) => {
    try {
        const room = req.body;
        await (0, room_service_1.createRoom)(room);
        res.status(201).json({ message: 'Habitación creada con éxito' });
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
exports.createRoomController = createRoomController;
const updateRoomController = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedRoom = req.body;
        await (0, room_service_1.updateRoom)(id, updatedRoom);
        res.status(200).json({ message: 'Habitación actualizada con éxito' });
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
exports.updateRoomController = updateRoomController;
const deleteRoomController = async (req, res) => {
    try {
        const id = req.params.id;
        await (0, room_service_1.deleteRoom)(id);
        res.status(200).json({ message: 'Habitación eliminada con éxito' });
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
exports.deleteRoomController = deleteRoomController;
const router = express_1.default.Router();
router.get('/', exports.getRoomsController);
router.get('/:id', exports.getRoomController);
router.post('/', exports.createRoomController);
router.put('/:id', exports.updateRoomController);
router.delete('/:id', exports.deleteRoomController);
exports.roomRoutes = router;
exports.roomEndpoint = {
    path: '/rooms',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    private: true
};
