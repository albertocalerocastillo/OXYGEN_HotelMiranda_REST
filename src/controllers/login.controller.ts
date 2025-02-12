import { Request, Response } from 'express';
import {
  findUserByUsernameAndPassword,
  generateToken,
} from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsernameAndPassword(username, password);

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};