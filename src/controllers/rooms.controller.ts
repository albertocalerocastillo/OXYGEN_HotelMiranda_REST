import express, { Request, Response } from 'express';
import { getRooms, getRoom, createRoom, updateRoom, deleteRoom } from '../services/room.service';

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
export const getRoomsController = async (req: Request, res: Response) => {
  try {
    const rooms = await getRooms();
    res.json(rooms);
  } catch (error: unknown) {
    handleErrors(res, error);
  }
};

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
export const createRoomController = async (req: Request, res: Response) => {
  try {
    const room = req.body;
    await createRoom(room);
    res.status(201).json({ message: 'Habitación creada con éxito' });
  } catch (error: unknown) {
    handleErrors(res, error);
  }
};

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