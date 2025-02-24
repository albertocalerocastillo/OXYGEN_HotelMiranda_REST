"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const RoomModel_1 = require("../models/RoomModel");
describe('Rooms API', () => {
    let roomId;
    let token;
    beforeAll(async () => {
        const loginResponse = await (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send({ username: 'James Sitepu', password: 'password123' });
        token = `Bearer ${loginResponse.body.token}`;
        const roomResponse = await (0, supertest_1.default)(app_1.default)
            .post('/rooms')
            .send({ name: 'Habitación de prueba', description: '...', price: 100, capacity: 2 })
            .set('Authorization', token);
        roomId = String(roomResponse.body.id);
        console.log("roomId generado:", roomId);
    });
    afterAll(async () => {
        await mongoose_1.default.disconnect();
    });
    afterEach(async () => {
        await RoomModel_1.RoomModel.deleteMany({});
    });
    describe('GET /rooms', () => {
        it('should return all rooms', async () => {
            const response = await (0, supertest_1.default)(app_1.default).get('/rooms');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });
    describe('GET /rooms/:id', () => {
        it('should return a room by ID', async () => {
            const response = await (0, supertest_1.default)(app_1.default).get(`/rooms/${roomId}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });
        it('should return 404 if room not found', async () => {
            const response = await (0, supertest_1.default)(app_1.default).get('/rooms/999');
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'Habitación no encontrada');
        });
    });
    describe('POST /rooms', () => {
        it('should create a new room', async () => {
            const newRoom = {
                name: 'Habitación de prueba',
                description: 'Descripción de la habitación de prueba',
                price: 100,
                capacity: 2,
            };
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/rooms')
                .send(newRoom)
                .set('Authorization', token);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Habitación creada con éxito');
            roomId = String(response.body.id);
            console.log("roomId generado:", roomId);
        });
        it('should return 400 if request body is invalid', async () => {
            const invalidRoom = {
                name: '',
                description: 'Descripción de la habitación de prueba',
                price: 'precio',
                capacity: 2,
            };
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/rooms')
                .send(invalidRoom)
                .set('Authorization', token);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
        });
    });
    describe('PUT /rooms/:id', () => {
        it('should update an existing room', async () => {
            const updatedRoom = {
                name: 'Habitación de prueba actualizada',
                description: 'Descripción actualizada de la habitación de prueba',
                price: 150,
                capacity: 3,
            };
            const response = await (0, supertest_1.default)(app_1.default)
                .put(`/rooms/${roomId}`)
                .send(updatedRoom)
                .set('Authorization', token);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Habitación actualizada con éxito');
        });
        it('should return 400 if request body is invalid', async () => {
            const invalidRoom = {
                name: '',
                description: 'Descripción actualizada de la habitación de prueba',
                price: 'precio',
                capacity: 3,
            };
            const response = await (0, supertest_1.default)(app_1.default)
                .put(`/rooms/${roomId}`)
                .send(invalidRoom)
                .set('Authorization', token);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
        });
    });
    describe('DELETE /rooms/:id', () => {
        it('should delete an existing room', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .delete(`/rooms/${roomId}`)
                .set('Authorization', token);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Habitación eliminada con éxito');
        });
    });
});
