"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactEndpoint = exports.contactRoutes = exports.archiveContactController = exports.getContactsController = void 0;
const express_1 = __importDefault(require("express"));
const ContactService_1 = require("../services/ContactService");
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
 * name: Contacts
 * description: Operaciones relacionadas con los contactos (archivar/desarchivar y obtener todos)
 */
/**
 * @swagger
 * /contacts:
 * get:
 * summary: Obtiene todos los contactos
 * tags: [Contacts]
 * responses:
 * 200:
 * description: Lista de contactos
 * 500:
 * description: Error del servidor
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
 * /contacts/{id}/archive:
 * put:
 * summary: Archiva o desarchiva un contacto por ID
 * tags: [Contacts]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID del contacto
 * - in: query
 * name: archived
 * schema:
 * type: boolean
 * required: true
 * description: Indica si el contacto debe ser archivado (true) o desarchivado (false)
 * responses:
 * 200:
 * description: Contacto archivado/desarchivado con éxito
 * 400:
 * description: Error de solicitud incorrecta
 * 500:
 * description: Error del servidor
 */
const archiveContactController = async (req, res) => {
    try {
        const id = req.params.id;
        const archived = req.query.archived === 'true';
        await ContactService_1.contactService.archiveContact(id, archived);
        res.status(200).json({ message: `Contacto ${archived ? 'archivado' : 'desarchivado'} con éxito` });
    }
    catch (error) {
        handleErrors(res, error);
    }
};
exports.archiveContactController = archiveContactController;
const router = express_1.default.Router();
router.get('/', exports.getContactsController);
router.put('/:id/archive', exports.archiveContactController);
exports.contactRoutes = router;
exports.contactEndpoint = {
    path: '/contacts',
    methods: ['GET', 'PUT'],
    private: true
};
