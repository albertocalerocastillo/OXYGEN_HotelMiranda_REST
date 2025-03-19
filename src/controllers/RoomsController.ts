import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { roomService } from '../services/RoomService';

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

export const getRoomsController = async (req: Request, res: Response) => {
    try {
        const rooms = await roomService.getRooms();
        res.json(rooms);
    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

export const getRoomController = async (req: Request, res: Response) => {
    try {
        const room = await roomService.getRoom(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }
        res.json(room);
    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

export const createRoomController = async (req: Request, res: Response) => {
    try {
        
       // const { error } = validateRoomCreate.validate(req.body);
      //  if (error) {
      //      return res.status(400).json({ message: error.details[0].message });
      //  }

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
        };

        const newRoom = { ...defaultRoom, ...roomData, id: uuidv4() };

        const createdRoom = await roomService.createRoom(newRoom);

        res.status(201).json({ message: 'Habitación creada con éxito', id: createdRoom.id });

    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

export const updateRoomController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updatedRoom = req.body;

        // const { error } = validateRoomUpdate.validate(updatedRoom);
        // if (error) {
        //     return res.status(400).json({ message: error.details[0].message });
        // }

        await roomService.updateRoom(id, updatedRoom);
        res.status(200).json({ message: 'Habitación actualizada con éxito' });
    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

export const deleteRoomController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await roomService.deleteRoom(id);
        res.status(200).json({ message: 'Habitación eliminada con éxito' });
    } catch (error: unknown) {
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