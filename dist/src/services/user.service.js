"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("../models/user.model");
async function loadBcrypt() {
    return await Promise.resolve().then(() => __importStar(require('bcrypt')));
}
class UserService {
    async getUsers() {
        try {
            return await user_model_1.UserModel.find();
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al obtener los usuarios: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al obtener los usuarios: Ha ocurrido un error inesperado');
            }
        }
    }
    async getUser(id) {
        try {
            return await user_model_1.UserModel.findById(id);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al obtener el usuario: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al obtener el usuario: Ha ocurrido un error inesperado');
            }
        }
    }
    async createUser(user) {
        try {
            const bcrypt = await loadBcrypt();
            if (!user.password) {
                throw new Error('La contraseña del usuario no está definida');
            }
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const newUser = new user_model_1.UserModel({ ...user, password: hashedPassword });
            return await newUser.save();
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al crear el usuario: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al crear el usuario: Ha ocurrido un error inesperado');
            }
        }
    }
    async updateUser(id, updatedUser) {
        try {
            return await user_model_1.UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al actualizar el usuario: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al actualizar el usuario: Ha ocurrido un error inesperado');
            }
        }
    }
    async deleteUser(id) {
        try {
            await user_model_1.UserModel.findByIdAndDelete(id);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error('Error al eliminar el usuario: ' + error.message);
            }
            else {
                console.error('Error desconocido:', error);
                throw new Error('Error al eliminar el usuario: Ha ocurrido un error inesperado');
            }
        }
    }
}
exports.userService = new UserService();
