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
exports.deleteRoom = exports.updateRoom = exports.createRoom = exports.getRoom = exports.getRooms = void 0;
const fs = __importStar(require("fs"));
const ROOMS_FILE = './src/data/rooms.json';
const getRooms = async () => {
    try {
        const data = await fs.promises.readFile(ROOMS_FILE, 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al leer el archivo de habitaciones');
    }
};
exports.getRooms = getRooms;
const getRoom = async (id) => {
    try {
        const data = await fs.promises.readFile(ROOMS_FILE, 'utf8');
        const rooms = JSON.parse(data);
        return rooms.find(r => r.id === id);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al leer el archivo de habitaciones');
    }
};
exports.getRoom = getRoom;
const createRoom = async (room) => {
    try {
        const data = await fs.promises.readFile(ROOMS_FILE, 'utf8');
        const rooms = JSON.parse(data);
        rooms.push(room);
        await fs.promises.writeFile(ROOMS_FILE, JSON.stringify(rooms, null, 2));
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al crear la habitación');
    }
};
exports.createRoom = createRoom;
const updateRoom = async (id, updatedRoom) => {
    try {
        const data = await fs.promises.readFile(ROOMS_FILE, 'utf8');
        const rooms = JSON.parse(data);
        const index = rooms.findIndex(r => r.id === id);
        if (index === -1) {
            throw new Error('Habitación no encontrada');
        }
        rooms[index] = { ...rooms[index], ...updatedRoom };
        await fs.promises.writeFile(ROOMS_FILE, JSON.stringify(rooms, null, 2));
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al actualizar la habitación');
    }
};
exports.updateRoom = updateRoom;
const deleteRoom = async (id) => {
    try {
        const data = await fs.promises.readFile(ROOMS_FILE, 'utf8');
        const rooms = JSON.parse(data);
        const updatedRooms = rooms.filter(r => r.id !== id);
        await fs.promises.writeFile(ROOMS_FILE, JSON.stringify(updatedRooms, null, 2));
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al eliminar la habitación');
    }
};
exports.deleteRoom = deleteRoom;
