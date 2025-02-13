import express, { Request, Response } from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../services/user.service';

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
 *   name: Users
 *   description: Operaciones relacionadas con los usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error del servidor
 */
export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error: unknown) {
    handleErrors(res, error);
  }
};

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
export const getUserController = async (req: Request, res: Response) => {
  try {
    const user = await getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error: unknown) {
    handleErrors(res, error);
  }
};

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define las propiedades del objeto de usuario aquí
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *       500:
 *         description: Error del servidor
 */
export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    await createUser(user);
    res.status(201).json({ message: 'Usuario creado con éxito' });
  } catch (error: unknown) {
    handleErrors(res, error);
  }
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define las propiedades del objeto de usuario aquí
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
export const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;
    await updateUser(id, updatedUser);
    res.status(200).json({ message: 'Usuario actualizado con éxito' });
  } catch (error: unknown) {
    handleErrors(res, error);
  }
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteUser(id);
    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error: unknown) {
    handleErrors(res, error);
  }
};

const router = express.Router();

router.get('/', getUsersController);
router.get('/:id', getUserController);
router.post('/', createUserController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export const userRoutes = router;

export const userEndpoint = {
  path: '/users',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  private: true
};