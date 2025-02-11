"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rooms_controller_1 = require("./controllers/rooms.controller");
const bookings_controller_1 = require("./controllers/bookings.controller");
const auth_1 = require("./middleware/auth");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/rooms', auth_1.authMiddleware, rooms_controller_1.roomRoutes);
app.use('/bookings', auth_1.authMiddleware, bookings_controller_1.bookingRoutes);
app.get('/', (req, res) => {
    const hotelData = {
        name: 'Hotel Miranda',
        endpoints: [
            rooms_controller_1.roomEndpoint,
            bookings_controller_1.bookingEndpoint
        ]
    };
    res.json(hotelData);
});
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
require('dotenv').config();
