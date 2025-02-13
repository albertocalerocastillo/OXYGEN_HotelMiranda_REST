import { Request, Response, NextFunction } from 'express';
import { validateRoomCreate, validateRoomUpdate } from '../validators/room.validator';

export const validateCreateRoom = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateRoomCreate.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateUpdateRoom = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateRoomUpdate.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};