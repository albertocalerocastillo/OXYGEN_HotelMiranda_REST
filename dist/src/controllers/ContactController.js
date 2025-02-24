"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactEndpoint = exports.contactRoutes = exports.deleteContactController = exports.updateContactController = exports.createContactController = exports.getContactController = exports.getContactsController = void 0;
const express_1 = __importDefault(require("express"));
const ContactService_1 = require("../services/ContactService");
const ContactValidator_1 = require("../validators/ContactValidator");
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
 *   name: Contacts
 *   description: Operaciones relacionadas con los contactos
 */
/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Obtiene todos los contactos
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Lista de contactos
 *       500:
 *         description: Error del servidor
 */
const getContactsController = async (req, res) => {
    try {
        const contacts = await ContactService_1.contactService.getContacts();
        res.json(contacts);
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.getContactsController = getContactsController;
/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Obtiene un contacto por ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del contacto
 *     responses:
 *       200:
 *         description: Datos del contacto
 *       404:
 *         description: Contacto no encontrado
 *       500:
 *         description: Error del servidor
 */
const getContactController = async (req, res) => {
    try {
        const contact = await ContactService_1.contactService.getContact(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
        }
        res.json(contact);
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.getContactController = getContactController;
/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Crea un nuevo contacto
 *     tags: [Contacts]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define las propiedades del objeto de contacto aquí
 *     responses:
 *       201:
 *         description: Contacto creado con éxito
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error del servidor
 */
const createContactController = async (req, res) => {
    try {
        const { error } = ContactValidator_1.validateContactCreate.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const contact = req.body;
        await ContactService_1.contactService.createContact(contact);
        res.status(201).json({ message: 'Contacto creado con éxito' });
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.createContactController = createContactController;
/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Actualiza un contacto existente
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del contacto
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define las propiedades del objeto de contacto aquí
 *     responses:
 *       200:
 *         description: Contacto actualizado con éxito
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Contacto no encontrado
 *       500:
 *         description: Error del servidor
 */
const updateContactController = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedContact = req.body;
        const { error } = ContactValidator_1.validateContactCreate.validate(updatedContact);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        await ContactService_1.contactService.updateContact(id, updatedContact);
        res.status(200).json({ message: 'Contacto actualizado con éxito' });
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.updateContactController = updateContactController;
/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Elimina un contacto
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del contacto
 *     responses:
 *       200:
 *         description: Contacto eliminado con éxito
 *       404:
 *         description: Contacto no encontrado
 *       500:
 *         description: Error del servidor
 */
const deleteContactController = async (req, res) => {
    try {
        const id = req.params.id;
        await ContactService_1.contactService.deleteContact(id);
        res.status(200).json({ message: 'Contacto eliminado con éxito' });
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.deleteContactController = deleteContactController;
const router = express_1.default.Router();
router.get('/', exports.getContactsController);
router.get('/:id', exports.getContactController);
router.post('/', exports.createContactController);
router.put('/:id', exports.updateContactController);
router.delete('/:id', exports.deleteContactController);
exports.contactRoutes = router;
exports.contactEndpoint = {
    path: '/contacts',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    private: true
};
