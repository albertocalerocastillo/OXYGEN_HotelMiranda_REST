import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { connect } from '../../db';

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

        const connection = await connect();
        const [rows] = await connection.execute('SELECT id FROM users WHERE id = ?', [decoded.userId]);
        connection.release();

        if ((rows as any).length === 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};