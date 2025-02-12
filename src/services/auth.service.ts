import { LoginUser } from '../interfaces/login-user.interface';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';

export const findUserByUsernameAndPassword = async (
  username: string,
  password: string
): Promise<LoginUser | undefined> => {
  const users: LoginUser[] = JSON.parse(
    fs.readFileSync('./src/data/users.json', 'utf8')
  );
  return users.find(
    (user) => user.name === username && user.password === password
  );
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch (error) {
    return null;
  }
};