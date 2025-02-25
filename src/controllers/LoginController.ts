import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel';

async function loadBcrypt() {
    return await import('bcrypt');
}

export const login = async (req: Request, res: Response) => {
    const bcrypt = await loadBcrypt();
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        console.log('Usuario encontrado:', user);
        console.log('Usuario encontrado:', user?.password);

        if (!user || !user.password) {
            return res.status(401).json({ message: '1' });
        }

        if (!password) {
            return res.status(401).json({ message: '2' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: '3' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};