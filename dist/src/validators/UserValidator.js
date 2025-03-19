"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserUpdate = exports.validateUserCreate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateUserCreate = joi_1.default.object({
    name: joi_1.default.string().trim().required().messages({
        'string.empty': 'El nombre es obligatorio.',
        'string.base': 'El nombre debe ser una cadena de texto.',
    }),
    email: joi_1.default.string().email().trim().required().messages({
        'string.empty': 'El email es obligatorio.',
        'string.email': 'El email debe tener un formato válido.',
        'string.base': 'El email debe ser una cadena de texto.',
    }),
    joinDate: joi_1.default.string().trim().required().isoDate().messages({
        'string.empty': 'La fecha de unión es obligatoria.',
        'string.base': 'La fecha de unión debe ser una cadena de texto.',
        'string.isoDate': 'La fecha de unión debe tener un formato YYYY-MM-DD.',
    }),
    jobDesk: joi_1.default.string().trim().allow('').messages({
        'string.base': 'El puesto de trabajo debe ser una cadena de texto.',
    }),
    contact: joi_1.default.string().trim().allow('').messages({
        'string.base': 'El contacto debe ser una cadena de texto.',
    }),
    status: joi_1.default.string().trim().required().valid('ACTIVE', 'INACTIVE').messages({
        'string.empty': 'El estado es obligatorio.',
        'string.base': 'El estado debe ser una cadena de texto.',
        'any.only': 'El estado debe ser "ACTIVE" o "INACTIVE".',
    }),
    password: joi_1.default.string().trim().required().messages({
        'string.empty': 'La contraseña es obligatoria.',
        'string.base': 'La contraseña debe ser una cadena de texto.',
    }),
});
exports.validateUserUpdate = joi_1.default.object({
    name: joi_1.default.string().trim().allow('').messages({
        'string.base': 'El nombre debe ser una cadena de texto.',
    }),
    email: joi_1.default.string().email().trim().allow('').messages({
        'string.email': 'El email debe tener un formato válido.',
        'string.base': 'El email debe ser una cadena de texto.',
    }),
    joinDate: joi_1.default.string().trim().allow('').isoDate().messages({
        'string.base': 'La fecha de unión debe ser una cadena de texto.',
        'string.isoDate': 'La fecha de unión debe tener un formato YYYY-MM-DD.',
    }),
    jobDesk: joi_1.default.string().trim().allow('').messages({
        'string.base': 'El puesto de trabajo debe ser una cadena de texto.',
    }),
    contact: joi_1.default.string().trim().allow('').messages({
        'string.base': 'El contacto debe ser una cadena de texto.',
    }),
    status: joi_1.default.string().trim().allow('').valid('ACTIVE', 'INACTIVE').messages({
        'string.base': 'El estado debe ser una cadena de texto.',
        'any.only': 'El estado debe ser "ACTIVE" o "INACTIVE".',
    }),
    profilePhoto: joi_1.default.string().trim().allow('').messages({
        'string.base': 'La foto de perfil debe ser una cadena de texto.',
    }),
    password: joi_1.default.string().trim().allow('').messages({
        'string.base': 'La contraseña debe ser una cadena de texto.',
    }),
});
