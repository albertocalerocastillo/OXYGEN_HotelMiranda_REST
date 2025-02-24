import express, { Request, Response } from 'express';
import { contactService } from '../services/ContactService';
import { validateContactCreate } from '../validators/ContactValidator';

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
export const getContactController = async (req: Request, res: Response) => {
    try {
        const contact = await contactService.getContact(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
        }
        res.json(contact);
    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

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
export const createContactController = async (req: Request, res: Response) => {
    try {
        const { error } = validateContactCreate.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const contact = req.body;
        await contactService.createContact(contact);
        res.status(201).json({ message: 'Contacto creado con éxito' });
    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

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
export const updateContactController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updatedContact = req.body;

        const { error } = validateContactCreate.validate(updatedContact);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        await contactService.updateContact(id, updatedContact);
        res.status(200).json({ message: 'Contacto actualizado con éxito' });
    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

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
export const deleteContactController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await contactService.deleteContact(id);
        res.status(200).json({ message: 'Contacto eliminado con éxito' });
    } catch (error: unknown) {
        handleErrors(res, error);
    }
};

const router = express.Router();

router.get('/', getContactsController);
router.get('/:id', getContactController);
router.post('/', createContactController);
router.put('/:id', updateContactController);
router.delete('/:id', deleteContactController);

export const contactRoutes = router;

export const contactEndpoint = {
    path: '/contacts',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    private: true
};