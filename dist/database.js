"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hotelmirandaapi';
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Conectado a la base de datos MongoDB');
    }
    catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
