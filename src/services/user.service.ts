import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';

class UserService {
    async getUsers(): Promise<User[]> {
        try {
            return await UserModel.find();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al obtener los usuarios: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al obtener los usuarios: Ha ocurrido un error inesperado');
            }
        }
    }

    async getUser(id: string): Promise<User | null> {
        try {
            return await UserModel.findById(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al obtener el usuario: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al obtener el usuario: Ha ocurrido un error inesperado');
            }
        }
    }

    async createUser(user: User): Promise<User> {
        try {
            const newUser = new UserModel(user);
            return await newUser.save();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al crear el usuario: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al crear el usuario: Ha ocurrido un error inesperado');
            }
        }
    }

    async updateUser(id: string, updatedUser: User): Promise<User | null> {
        try {
            return await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al actualizar el usuario: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al actualizar el usuario: Ha ocurrido un error inesperado');
            }
        }
    }

    async deleteUser(id: string): Promise<void> {
        try {
            await UserModel.findByIdAndDelete(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al eliminar el usuario: ' + error.message);
            } else {
                console.error('Error desconocido:', error);
                throw new Error('Error al eliminar el usuario: Ha ocurrido un error inesperado');
            }
        }
    }
}

export const userService = new UserService();