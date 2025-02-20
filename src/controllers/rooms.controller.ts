import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { roomService } from '../services/room.service';
import { validateRoomCreate, validateRoomUpdate } from '../validators/room.validator';
import mongoose from 'mongoose';

/**
 * Función para manejar errores y enviar respuestas con código de error 500
 * @param res 
 * @param error 
 */
const handleErrors = (res: Response, error: unknown) => {
    if (error instanceof Error) {
        console.error(error.message);
        if (error.message === 'Habitación no encontrada') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    } else {
        console.error('Error desconocido:', error);
        res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
    }
};

/**
 * @swagger
 * tags:
 * name: Rooms
 * description: Operaciones relacionadas con las habitaciones
 */

/**
 * @swagger
 * /rooms:
 * get:
 * summary: Obtiene todas las habitaciones
 * tags: [Rooms]
 * responses:
 * 200:
 * description: Lista de habitaciones
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Room'
 * 500:
 * description: Error del servidor
 */
export const getRoomsController = async (req: Request, res: Response) => {
    try {
        const rooms = await roomService.getRooms();
        res.json(rooms);
    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

/**
 * @swagger
 * /rooms/{id}:
 * get:
 * summary: Obtiene una habitación por ID
 * tags: [Rooms]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID de la habitación
 * responses:
 * 200:
 * description: Datos de la habitación
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Room'
 * 400:
 * description: ID de habitación no válido
 * 404:
 * description: Habitación no encontrada
 * 500:
 * description: Error del servidor
 */
export const getRoomController = async (req: Request, res: Response) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'ID de habitación no válido' });
        }
        const room = await roomService.getRoom(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }
        res.json(room);
    } catch (error: unknown) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: 'ID de habitación no válido' });
        }
        handleErrors(res, error);
    }
};

/**
 * @swagger
 * /rooms:
 * post:
 * summary: Crea una nueva habitación
 * tags: [Rooms]
 * requestBody:
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/RoomInput'
 * responses:
 * 201:
 * description: Habitación creada con éxito
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * id:
 * type: string
 * 400:
 * description: Error de validación
 * 500:
 * description: Error del servidor
 */
export const createRoomController = async (req: Request, res: Response) => {
    try {
        const { error } = validateRoomCreate.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const roomData = req.body;

        const defaultRoom = {
            photo: "",
            number: "",
            name: "aa",
            type: "",
            amenities: "",
            price: 0,
            offerPrice: 0,
            status: "",
            description: "",
            capacity: 0,
        };

        const newRoom = { ...defaultRoom, ...roomData, id: uuidv4() };

        const createdRoom = await roomService.createRoom(newRoom);

        res.status(201).json({ message: 'Habitación creada con éxito', id: createdRoom.id });

    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

/**
 * @swagger
 * /rooms/{id}:
 * put:
 * summary: Actualiza una habitación existente
 * tags: [Rooms]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID de la habitación
 * requestBody:
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/RoomInput'
 * responses:
 * 200:
 * description: Habitación actualizada con éxito
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * 400:
 * description: Error de validación
 * 404:
 * description: Habitación no encontrada
 * 500:
 * description: Error del servidor
 */
export const updateRoomController = async (req: Request, res: Response) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'ID de habitación no válido' });
        }
        const id = req.params.id;
        const updatedRoom = req.body;

        const { error } = validateRoomUpdate.validate(updatedRoom);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        await roomService.updateRoom(id, updatedRoom);
        res.status(200).json({ message: 'Habitación actualizada con éxito' });
    } catch (error: unknown) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: 'ID de habitación no válido' });
        }
        handleErrors(res, error);
    }
};

/**
 * @swagger
 * /rooms/{id}:
 * delete:
 * summary: Elimina una habitación
 * tags: [Rooms]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID de la habitación
 * responses:
 * 200:
 * description: Habitación eliminada con éxito
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * 400:
 * description: ID de habitación no válido
 * 404:
 * description: Habitación no encontrada
 * 500:
 * description: Error del servidor
 */
export const deleteRoomController = async (req: Request, res: Response) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'ID de habitación no válido' });
        }
        const id = req.params.id;
        await roomService.deleteRoom(id);
        res.status(200).json({ message:'Habitación eliminada con éxito' });
    } catch (error: unknown) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: 'ID de habitación no válido' });
        }
        handleErrors(res, error);
    }
};

const router = express.Router();

router.get('/', getRoomsController);
router.get('/:id', getRoomController);
router.post('/', createRoomController);
router.put('/:id', updateRoomController);
router.delete('/:id', deleteRoomController);

export const roomRoutes = router;

export const roomEndpoint = {
    path: '/rooms',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    private: true
};