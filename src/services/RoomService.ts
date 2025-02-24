import { Room } from '../interfaces/RoomInterface';
import { RoomModel } from '../models/RoomModel';

class RoomService {
    async getRooms(): Promise<Room[]> {
        try {
            return await RoomModel.find();
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener las habitaciones');
        }
    }

    async getRoom(id: string): Promise<Room | null> {
        try {
            return await RoomModel.findById(id);
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener la habitación');
        }
    }

    async createRoom(room: Room): Promise<Room> {
        try {
            const newRoom = new RoomModel(room);
            return await newRoom.save();
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear la habitación');
        }
    }

    async updateRoom(id: string, updatedRoom: Room): Promise<Room | null> {
        try {
            return await RoomModel.findByIdAndUpdate(id, updatedRoom, { new: true });
        } catch (error) {
            console.error(error);
            throw new Error('Error al actualizar la habitación');
        }
    }

    async deleteRoom(id: string): Promise<void> {
        try {
            await RoomModel.findByIdAndDelete(id);
        } catch (error) {
            console.error(error);
            throw new Error('Error al eliminar la habitación');
        }
    }
}

export const roomService = new RoomService();