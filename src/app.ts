import express, { Request, Response } from 'express';
import { connectDB } from '../database';
import { roomRoutes } from './controllers/RoomsController';
import { bookingRoutes } from './controllers/BookingsController';
import { contactRoutes } from './controllers/ContactController';
import { userRoutes } from './controllers/UserController';
import { login } from './controllers/LoginController';
import { authMiddleware } from './middleware/auth';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Hotel Miranda',
            version: '1.0.0',
            description: 'Documentación de la API del hotel'
        },
    },
    apis: [
        './src/controllers/rooms.controller.ts',
        './src/controllers/bookings.controller.ts',
        './src/controllers/contact.controller.ts',
        './src/controllers/user.controller.ts',
        './src/controllers/login.controller.ts'
    ],
    components: {
        schemas: {
            Room: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'ID de la habitación' },
                    photo: { type: 'string', description: 'URL de la foto de la habitación' },
                    number: { type: 'string', description: 'Número de la habitación' },
                    name: { type: 'string', description: 'Nombre de la habitación' },
                    type: { type: 'string', description: 'Tipo de habitación (Double Bed)' },
                    amenities: { type: 'string', description: 'Comodidades de la habitación' },
                    price: { type: 'number', format: 'float', description: 'Precio por noche' },
                    offerPrice: { type: 'number', format: 'float', description: 'Precio de oferta' },
                    status: { type: 'string', description: 'Estado de la habitación (Available)' }
                }
            },
            Booking: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'ID de la reserva' },
                    guest: { type: 'string', description: 'Nombre del huésped' },
                    orderDate: { type: 'string', description: 'Fecha de la orden' },
                    checkInDate: { type: 'string', description: 'Fecha de check-in' },
                    checkInTime: { type: 'string', description: 'Hora de check-in' },
                    checkOutDate: { type: 'string', description: 'Fecha de check-out' },
                    checkOutTime: { type: 'string', description: 'Hora de check-out' },
                    specialRequest: { type: 'string', description: 'Solicitud especial' },
                    roomType: { type: 'string', description: 'Tipo de habitación reservada' },
                    status: { type: 'string', description: 'Estado de la reserva (Booked, Refund, Pending, Canceled)' },
                    specialRequestType: { type: 'string', description: 'Tipo de solicitud especial' }
                }
            },
            Contact: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'ID del contacto' },
                    date: { type: 'string', description: 'Fecha del contacto' },
                    customer: { type: 'string', description: 'Nombre del cliente' },
                    email: { type: 'string', format: 'email', description: 'Correo electrónico del cliente' },
                    phone: { type: 'string', description: 'Teléfono del cliente' },
                    subject: { type: 'string', description: 'Asunto del contacto' },
                    comment: { type: 'string', description: 'Comentario del cliente' },
                    archived: { type: 'boolean', description: 'Indica si el contacto está archivado' }
                }
            },
            User: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'ID del usuario' },
                    name: { type: 'string', description: 'Nombre del usuario' },
                    email: { type: 'string', format: 'email', description: 'Correo electrónico del usuario' },
                    joinDate: { type: 'string', description: 'Fecha de ingreso del usuario' },
                    jobDesk: { type: 'string', description: 'Descripción del puesto de trabajo del usuario' },
                    contact: { type: 'string', description: 'Información de contacto del usuario' },
                    status: { type: 'string', description: 'Estado del usuario (ACTIVE, INACTIVE)' },
                    profilePhoto: { type: 'string', description: 'URL de la foto de perfil del usuario' },
                    password: { type: 'string', description: 'Contraseña del usuario' }
                }
            }
        }
    }
};

const specs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());

app.use(cors());

app.post('/login', login);
app.use('/rooms', authMiddleware, roomRoutes);
app.use('/bookings', authMiddleware, bookingRoutes);
app.use('/contacts', authMiddleware, contactRoutes);
app.use('/users', authMiddleware, userRoutes);

app.get('/', (req: Request, res: Response) => {
    const hotelData = {
        name: 'Hotel Miranda',
        endpoints: [
            { path: '/rooms', methods: ['GET', 'POST', 'PUT', 'DELETE'], private: true },
            { path: '/bookings', methods: ['GET', 'POST', 'PUT', 'DELETE'], private: true },
            { path: '/contacts', methods: ['GET', 'POST', 'PUT', 'DELETE'], private: true },
            { path: '/users', methods: ['GET', 'POST', 'PUT', 'DELETE'], private: true }
        ]
    };
    res.json(hotelData);
});

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor escuchando en el puerto ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error al iniciar el servidor:', error);
    });

export default app;