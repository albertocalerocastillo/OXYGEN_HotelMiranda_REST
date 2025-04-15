"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEndpoint = exports.userRoutes = exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserController = exports.getUsersController = void 0;
const express_1 = __importDefault(require("express"));
const UserService_1 = require("../services/UserService");
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * Función para manejar errores y enviar respuestas con código de error 500
 * @param res
 * @param error
 */
const handleErrors = (res, error) => {
    if (error instanceof Error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
    else {
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
const getUsersController = async (req, res) => {
    try {
        const users = await UserService_1.userService.getUsers();
        res.json(users);
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.getUsersController = getUsersController;
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
const getUserController = async (req, res) => {
    try {
        const user = await UserService_1.userService.getUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.getUserController = getUserController;
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
const createUserController = async (req, res) => {
    console.log('createUserController fue alcanzado');
    console.log('req.body:', req.body);
    try {
        const { name, email, contact, joinDate, jobDesk, status, password } = req.body;
        const defaultProfilePhotoPath = '../../assets/perfil.jpg';
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
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
        await UserService_1.userService.createUser(userWithDefaultPhoto);
        res.status(201).json({ message: 'Usuario creado con éxito', data: { ...userWithDefaultPhoto, password: undefined } });
    }
    catch (error) {
        console.error('Error en createUserController:', error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};
exports.createUserController = createUserController;
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
const updateUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = req.body;
        // const { error } = validateUserUpdate.validate(updatedUser);
        // if (error) {
        //     return res.status(400).json({ message: error.details[0].message });
        // }
        await UserService_1.userService.updateUser(id, updatedUser);
        res.status(200).json({ message: 'Usuario actualizado con éxito' });
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.updateUserController = updateUserController;
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
const deleteUserController = async (req, res) => {
    try {
        const id = req.params.id;
        await UserService_1.userService.deleteUser(id);
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.deleteUserController = deleteUserController;
const router = express_1.default.Router();
router.get('/', exports.getUsersController);
router.get('/:id', exports.getUserController);
router.post('/', exports.createUserController);
router.put('/:id', exports.updateUserController);
router.delete('/:id', exports.deleteUserController);
exports.userRoutes = router;
exports.userEndpoint = {
    path: '/users',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    private: true
};
