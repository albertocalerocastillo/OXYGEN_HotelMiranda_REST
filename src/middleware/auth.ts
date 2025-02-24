import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel';

declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: string };
        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = { id: user._id };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};