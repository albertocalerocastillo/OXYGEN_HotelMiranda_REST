import Joi from 'joi';

export const validateUserCreate = Joi.object({
    name: Joi.string().trim().required().messages({
        'string.empty': 'El nombre es obligatorio.',
        'string.base': 'El nombre debe ser una cadena de texto.',
    }),
    email: Joi.string().email().trim().required().messages({
        'string.empty': 'El email es obligatorio.',
        'string.email': 'El email debe tener un formato válido.',
        'string.base': 'El email debe ser una cadena de texto.',
    }),
    joinDate: Joi.string().trim().required().isoDate().messages({
        'string.empty': 'La fecha de unión es obligatoria.',
        'string.base': 'La fecha de unión debe ser una cadena de texto.',
        'string.isoDate': 'La fecha de unión debe tener un formato YYYY-MM-DD.',
    }),
    jobDesk: Joi.string().trim().allow('').messages({
        'string.base': 'El puesto de trabajo debe ser una cadena de texto.',
    }),
    contact: Joi.string().trim().allow('').messages({
        'string.base': 'El contacto debe ser una cadena de texto.',
    }),
    status: Joi.string().trim().required().valid('ACTIVE', 'INACTIVE').messages({
        'string.empty': 'El estado es obligatorio.',
        'string.base': 'El estado debe ser una cadena de texto.',
        'any.only': 'El estado debe ser "ACTIVE" o "INACTIVE".',
    }),
    password: Joi.string().trim().required().messages({
        'string.empty': 'La contraseña es obligatoria.',
        'string.base': 'La contraseña debe ser una cadena de texto.',
    }),
});

export const validateUserUpdate = Joi.object({
    name: Joi.string().trim().allow('').messages({
        'string.base': 'El nombre debe ser una cadena de texto.',
    }),
    email: Joi.string().email().trim().allow('').messages({
        'string.email': 'El email debe tener un formato válido.',
        'string.base': 'El email debe ser una cadena de texto.',
    }),
    joinDate: Joi.string().trim().allow('').isoDate().messages({
        'string.base': 'La fecha de unión debe ser una cadena de texto.',
        'string.isoDate': 'La fecha de unión debe tener un formato YYYY-MM-DD.',
    }),
    jobDesk: Joi.string().trim().allow('').messages({
        'string.base': 'El puesto de trabajo debe ser una cadena de texto.',
    }),
    contact: Joi.string().trim().allow('').messages({
        'string.base': 'El contacto debe ser una cadena de texto.',
    }),
    status: Joi.string().trim().allow('').valid('ACTIVE', 'INACTIVE').messages({
        'string.base': 'El estado debe ser una cadena de texto.',
        'any.only': 'El estado debe ser "ACTIVE" o "INACTIVE".',
    }),
    profilePhoto: Joi.string().trim().allow('').messages({
        'string.base': 'La foto de perfil debe ser una cadena de texto.',
    }),
    password: Joi.string().trim().allow('').messages({
        'string.base': 'La contraseña debe ser una cadena de texto.',
    }),
});