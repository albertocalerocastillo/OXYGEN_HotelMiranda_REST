"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomService = void 0;
const RoomModel_1 = require("../models/RoomModel");
class RoomService {
    async getRooms() {
        try {
            return await RoomModel_1.RoomModel.find();
        }
        catch (error) {
            console.error(error);
            throw new Error('Error al obtener las habitaciones');
        }
    }
    async getRoom(id) {
        try {
            return await RoomModel_1.RoomModel.findById(id);
        }
        catch (error) {
            console.error(error);
            throw new Error('Error al obtener la habitación');
        }
    }
    async createRoom(room) {
        try {
            const newRoom = new RoomModel_1.RoomModel(room);
            return await newRoom.save();
        }
        catch (error) {
            console.error(error);
            throw new Error('Error al crear la habitación');
        }
    }
    async updateRoom(id, updatedRoom) {
        try {
            return await RoomModel_1.RoomModel.findByIdAndUpdate(id, updatedRoom, { new: true });
        }
        catch (error) {
            console.error(error);
            throw new Error('Error al actualizar la habitación');
        }
    }
    async deleteRoom(id) {
        try {
            await RoomModel_1.RoomModel.findByIdAndDelete(id);
        }
        catch (error) {
            console.error(error);
            throw new Error('Error al eliminar la habitación');
        }
    }
}
exports.roomService = new RoomService();
