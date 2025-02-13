import { Request, Response } from 'express';
import {
  findUserByUsernameAndPassword,
  generateToken,
} from '../services/auth.service';

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags: [Authentication]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token de autenticación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error del servidor
 */
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