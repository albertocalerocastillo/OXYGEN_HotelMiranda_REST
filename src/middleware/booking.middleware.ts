import { Request, Response, NextFunction } from 'express';
import { validateBookingCreate } from '../validators/booking.validator';

export const validateCreateBooking = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateBookingCreate.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

//quitar los middleware y ponerlo en controllers