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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const fs = __importStar(require("fs"));
const USERS_FILE = './src/data/users.json';
const getUsers = async () => {
    try {
        const data = await fs.promises.readFile(USERS_FILE, 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al leer el archivo de usuarios');
    }
};
exports.getUsers = getUsers;
const getUser = async (id) => {
    try {
        const data = await fs.promises.readFile(USERS_FILE, 'utf8');
        const users = JSON.parse(data);
        return users.find(u => u.id === id);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al leer el archivo de usuarios');
    }
};
exports.getUser = getUser;
const createUser = async (user) => {
    try {
        const data = await fs.promises.readFile(USERS_FILE, 'utf8');
        const users = JSON.parse(data);
        users.push(user);
        await fs.promises.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al crear el usuario');
    }
};
exports.createUser = createUser;
const updateUser = async (id, updatedUser) => {
    try {
        const data = await fs.promises.readFile(USERS_FILE, 'utf8');
        const users = JSON.parse(data);
        const index = users.findIndex(u => u.id === id);
        if (index === -1) {
            throw new Error('Usuario no encontrado');
        }
        users[index] = { ...users[index], ...updatedUser };
        await fs.promises.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al actualizar el usuario');
    }
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    try {
        const data = await fs.promises.readFile(USERS_FILE, 'utf8');
        const users = JSON.parse(data);
        const updatedUsers = users.filter(u => u.id !== id);
        await fs.promises.writeFile(USERS_FILE, JSON.stringify(updatedUsers, null, 2));
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al eliminar el usuario');
    }
};
exports.deleteUser = deleteUser;
