import express, { Request, Response } from 'express';
import { getRooms, getRoom, createRoom, updateRoom, deleteRoom } from '../services/room.service';

const handleErrors = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  } else {
    console.error('Error desconocido:', error);
    res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
  }
};

export const getRoomsController = async (req: Request, res: Response) => {
  try {
    const rooms = await getRooms();
    res.json(rooms);
  } catch (error: unknown) {
    handleErrors(res, error);
  }
};

export const getRoomController = async (req: Request, res: Response) => {
  try {
    const room = await getRoom(req.params.id);
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
    const room = req.body;
    await createRoom(room);
    res.status(201).json({ message: 'Habitación creada con éxito' });
  } catch (error: unknown) {
    handleErrors(res, error);
  }
};

export const updateRoomController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedRoom = req.body;
    await updateRoom(id, updatedRoom);
    res.status(200).json({ message: 'Habitación actualizada con éxito' });
  } catch (error: unknown) {
    handleErrors(res, error);
  }
};

export const deleteRoomController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteRoom(id);
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