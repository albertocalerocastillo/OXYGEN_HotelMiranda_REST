import express, { Request, Response } from 'express';
import { userService } from '../services/UserService';
import bcrypt from 'bcrypt';
import { validateUserCreate, validateUserUpdate } from '../validators/UserValidator';

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
        const users = await userService.getUsers();
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
        const user = await userService.getUser(req.params.id);
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
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error del servidor
 */
export const createUserController = async (req: Request, res: Response) => {
    console.log('createUserController fue alcanzado');
    console.log('req.body:', req.body);
    try {
        const { name, email, contact, joinDate, jobDesk, status, password } = req.body;
        const defaultProfilePhotoPath = '../../assets/perfil.jpg';

        const hashedPassword = await bcrypt.hash(password, 10);

        const userWithDefaultPhoto = {
            name,
            email,
            contact,
            joinDate,
            jobDesk,
            status,
            password: hashedPassword,
            profilePhoto: defaultProfilePhotoPath,
        };

        await userService.createUser(userWithDefaultPhoto);
        res.status(201).json({ message: 'Usuario creado con éxito', data: { ...userWithDefaultPhoto, password: undefined } });
    } catch (error: unknown) {
        console.error('Error en createUserController:', error);
        res.status(500).json({ message: 'Error al crear el usuario' });
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
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
export const updateUserController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updatedUser = req.body;
        // const { error } = validateUserUpdate.validate(updatedUser);
        // if (error) {
        //     return res.status(400).json({ message: error.details[0].message });
        // }
        await userService.updateUser(id, updatedUser);
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
        await userService.deleteUser(id);
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