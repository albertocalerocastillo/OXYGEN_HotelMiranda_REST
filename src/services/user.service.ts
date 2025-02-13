import { User } from '../interfaces/user.interface';
import * as fs from 'fs';

const USERS_FILE = './src/data/users.json';

export const getUsers = async (): Promise<User[]> => {
  try {
    const data = await fs.promises.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    throw new Error('Error al leer el archivo de usuarios');
  }
};

export const getUser = async (id: string): Promise<User | undefined> => {
  try {
    const data = await fs.promises.readFile(USERS_FILE, 'utf8');
    const users: User[] = JSON.parse(data);
    return users.find(u => u.id === id);
  } catch (error) {
    console.error(error);
    throw new Error('Error al leer el archivo de usuarios');
  }
};

export const createUser = async (user: User): Promise<void> => {
  try {
    const data = await fs.promises.readFile(USERS_FILE, 'utf8');
    const users: User[] = JSON.parse(data);
    users.push(user);
    await fs.promises.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el usuario');
  }
};

export const updateUser = async (id: string, updatedUser: User): Promise<void> => {
  try {
    const data = await fs.promises.readFile(USERS_FILE, 'utf8');
    const users: User[] = JSON.parse(data);

    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('Usuario no encontrado');
    }

    users[index] = { ...users[index], ...updatedUser };
    await fs.promises.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el usuario');
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    const data = await fs.promises.readFile(USERS_FILE, 'utf8');
    const users: User[] = JSON.parse(data);
    const updatedUsers = users.filter(u => u.id !== id);
    await fs.promises.writeFile(USERS_FILE, JSON.stringify(updatedUsers, null, 2));
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el usuario');
  }
};