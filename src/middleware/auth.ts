import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth.service';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const userId = verifyToken(token);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = { id: userId };
  next();
};