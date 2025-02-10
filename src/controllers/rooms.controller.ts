import { Request, Response } from 'express';

export const getRooms = (req: Request, res: Response) => {
  res.send('Listado de habitaciones');
};