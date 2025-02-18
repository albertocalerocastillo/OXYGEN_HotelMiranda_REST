"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("../database");
const rooms_controller_1 = require("./controllers/rooms.controller");
const bookings_controller_1 = require("./controllers/bookings.controller");
const contact_controller_1 = require("./controllers/contact.controller");
const user_controller_1 = require("./controllers/user.controller");
const login_controller_1 = require("./controllers/login.controller");
const auth_1 = require("./middleware/auth");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
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
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.use(express_1.default.json());
app.post('/login', login_controller_1.login);
app.use('/rooms', auth_1.authMiddleware, rooms_controller_1.roomRoutes);
app.use('/bookings', auth_1.authMiddleware, bookings_controller_1.bookingRoutes);
app.use('/contacts', auth_1.authMiddleware, contact_controller_1.contactRoutes);
app.use('/users', auth_1.authMiddleware, user_controller_1.userRoutes);
app.get('/', (req, res) => {
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
(0, database_1.connectDB)()
    .then(() => {
    app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${port}`);
    });
})
    .catch((error) => {
    console.error('Error al iniciar el servidor:', error);
});
exports.default = app;
