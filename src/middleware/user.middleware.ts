import { Request, Response, NextFunction } from 'express';
import { validateUserCreate, validateUserUpdate } from '../validators/user.validator';

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateUserCreate.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateUserUpdate.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};