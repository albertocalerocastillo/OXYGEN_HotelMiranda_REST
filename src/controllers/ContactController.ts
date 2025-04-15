import express, { Request, Response } from 'express';
import { contactService } from '../services/ContactService';

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
export const getContactsController = async (req: Request, res: Response) => {
    try {
        const contacts = await contactService.getContacts();
        res.json(contacts);
    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

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
export const archiveContactController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const archived = req.query.archived === 'true';

        await contactService.archiveContact(id, archived);
        res.status(200).json({ message: `Contacto ${archived ? 'archivado' : 'desarchivado'} con éxito` });
    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

const router = express.Router();

router.get('/', getContactsController);
router.put('/:id/archive', archiveContactController);

export const contactRoutes = router;

export const contactEndpoint = {
    path: '/contacts',
    methods: ['GET', 'PUT'],
    private: true
};