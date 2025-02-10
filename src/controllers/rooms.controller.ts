import { Request, Response } from 'express';
import { Room } from '../interfaces/room.interface';
import * as fs from 'fs';

const ROOMS_FILE = './src/data/rooms.json';

export const getRooms = (req: Request, res: Response) => {
  fs.readFile(ROOMS_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al leer el archivo de habitaciones.' });
    }
    const rooms: Room[] = JSON.parse(data);
    res.json(rooms);
  });
};

export const getRoom = (req: Request, res: Response) => {
  fs.readFile(ROOMS_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al leer el archivo de habitaciones.' });
    }
    const rooms: Room[] = JSON.parse(data);
    const room = rooms.find(r => r.id === req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Habitación no encontrada.' });
    }
    res.json(room);
  });
};