"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomEndpoint = exports.roomRoutes = exports.deleteRoomController = exports.updateRoomController = exports.createRoomController = exports.getRoomController = exports.getRoomsController = void 0;
const express_1 = __importDefault(require("express"));
const RoomService_1 = require("../services/RoomService");
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
const getRoomsController = async (req, res) => {
    try {
        const rooms = await RoomService_1.roomService.getRooms();
        res.json(rooms);
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.getRoomsController = getRoomsController;
const getRoomController = async (req, res) => {
    try {
        const room = await RoomService_1.roomService.getRoom(req.params.id);
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
const createRoomController = async (req, res) => {
    try {
        const roomData = req.body;
        const defaultRoom = {
            photo: "default_room_photo.jpg",
            number: "",
            name: "aa",
            type: "",
            amenities: [],
            price: 0,
            offerPrice: 0,
            status: "Available",
            offer: "NO",
        };
        const newRoom = { ...defaultRoom, ...roomData };
        const createdRoom = await RoomService_1.roomService.createRoom(newRoom);
        res.status(201).json({ message: 'Habitación creada con éxito', id: createdRoom.id });
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.createRoomController = createRoomController;
const updateRoomController = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedRoom = req.body;
        // const { error } = validateRoomUpdate.validate(updatedRoom);
        // if (error) {
        //     return res.status(400).json({ message: error.details[0].message });
        // }
        await RoomService_1.roomService.updateRoom(id, updatedRoom);
        res.status(200).json({ message: 'Habitación actualizada con éxito' });
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.updateRoomController = updateRoomController;
const deleteRoomController = async (req, res) => {
    try {
        const id = req.params.id;
        await RoomService_1.roomService.deleteRoom(id);
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
router.post('/', exports.createRoomController);
router.put('/:id', exports.updateRoomController);
router.delete('/:id', exports.deleteRoomController);
exports.roomRoutes = router;
exports.roomEndpoint = {
    path: '/rooms',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    private: true
};
