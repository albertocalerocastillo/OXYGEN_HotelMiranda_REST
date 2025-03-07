import { Room } from '../interfaces/RoomInterface';
import { connect } from '../../db';
import { RowDataPacket } from 'mysql2';

class RoomService {
    async getRooms(): Promise<Room[]> {
        try {
            const connection = await connect();
            const [rows] = await connection.execute('SELECT * FROM rooms');
            connection.release();
            return rows as Room[];
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener las habitaciones');
        }
    }

    async getRoom(id: string): Promise<Room | null> {
        try {
            const connection = await connect();
            const [rows] = await connection.execute('SELECT * FROM rooms WHERE id = ?', [id]);
            connection.release();

            const rowsData = rows as RowDataPacket;

            return rowsData.length > 0 ? rowsData[0] as Room : null;
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener la habitación');
        }
    }


    async createRoom(room: Room): Promise<Room> {
        try {
            const connection = await connect();
            const { name, type, number, amenities, price, discount, offerPrice, photos, status, description, offer, cancellation } = room;
            const [result] = await connection.execute(
                'INSERT INTO rooms (name, type, number, amenities, price, discount, offerPrice, photos, status, description, offer, cancellation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [name, type, number, amenities, price, discount, offerPrice, photos, status, description, offer, cancellation]
            );
            const insertedId = (result as any).insertId;
            connection.release();
            return { ...room, id: insertedId };
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear la habitación');
        }
    }

    async updateRoom(id: string, updatedRoom: Room): Promise<Room | null> {
        try {
            const connection = await connect();
            const { name, type, number, amenities, price, discount, offerPrice, photos, status, description, offer, cancellation } = updatedRoom;
            await connection.execute(
                'UPDATE rooms SET name = ?, type = ?, number = ?, amenities = ?, price = ?, discount = ?, offerPrice = ?, photos = ?, status = ?, description = ?, offer = ?, cancellation = ? WHERE id = ?',
                [name, type, number, amenities, price, discount, offerPrice, photos, status, description, offer, cancellation, id]
            );
            connection.release();
            return updatedRoom;
        } catch (error) {
            console.error(error);
            throw new Error('Error al actualizar la habitación');
        }
    }

    async deleteRoom(id: string): Promise<void> {
        try {
            const connection = await connect();
            await connection.execute('DELETE FROM rooms WHERE id = ?', [id]);
            connection.release();
        } catch (error) {
            console.error(error);
            throw new Error('Error al eliminar la habitación');
        }
    }
}

export const roomService = new RoomService();