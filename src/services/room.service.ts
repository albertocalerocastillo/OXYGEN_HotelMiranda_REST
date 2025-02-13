import { Room } from '../interfaces/room.interface';
import * as fs from 'fs';

const ROOMS_FILE = './src/data/rooms.json';

export const getRooms = async (): Promise<Room[]> => {
  try {
    const data = await fs.promises.readFile(ROOMS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    throw new Error('Error al leer el archivo de habitaciones');
  }
};

export const getRoom = async (id: string): Promise<Room | undefined> => {
  try {
      const data = await fs.promises.readFile(ROOMS_FILE, 'utf8');
      const rooms: Room[] = JSON.parse(data);
      return rooms.find(r => String(r.id) === id);
  } catch (error) {
      console.error(error);
      throw new Error('Error al leer el archivo de habitaciones');
  }
};

export const createRoom = async (room: Room): Promise<Room> => {
  try {
      const data = await fs.promises.readFile(ROOMS_FILE, 'utf8');
      const rooms: Room[] = JSON.parse(data);

      rooms.push(room);

      await fs.promises.writeFile(ROOMS_FILE, JSON.stringify(rooms, null, 2));

      return room;

  } catch (error) {
      console.error(error);
      throw new Error('Error al crear la habitación');
  }
};

export const updateRoom = async (id: string, updatedRoom: Room): Promise<void> => {
  try {
      const data = await fs.promises.readFile(ROOMS_FILE, 'utf8');
      const rooms: Room[] = JSON.parse(data);
      const index = rooms.findIndex(r => String(r.id) === id);
      if (index === -1) {
          throw new Error('Habitación no encontrada');
      }
      rooms[index] = { ...rooms[index], ...updatedRoom };
      try {
          await fs.promises.writeFile(ROOMS_FILE, JSON.stringify(rooms, null, 2));
      } catch (error) {
          throw new Error('Error al actualizar la habitación');
      }
  } catch (error) {
      console.error("Error al actualizar la habitación:", error);
      throw new Error('Error al actualizar la habitación');
  }
};

export const deleteRoom = async (id: string): Promise<void> => {
  try {
    const data = await fs.promises.readFile(ROOMS_FILE, 'utf8');
    const rooms: Room[] = JSON.parse(data);
    const updatedRooms = rooms.filter(r => r.id !== id);
    await fs.promises.writeFile(ROOMS_FILE, JSON.stringify(updatedRooms, null, 2));
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar la habitación');
  }
};