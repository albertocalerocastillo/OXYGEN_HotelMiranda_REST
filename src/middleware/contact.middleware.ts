import { Request, Response, NextFunction } from 'express';
import { validateContactCreate } from '../validators/contact.validator';

export const validateCreateContact = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateContactCreate.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};