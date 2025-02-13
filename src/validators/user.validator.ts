import Joi from 'joi';

export const validateUserCreate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  joinDate: Joi.string().required(),
  jobDesk: Joi.string(),
  contact: Joi.string(),
  status: Joi.string().required(),
  profilePhoto: Joi.string(),
  password: Joi.string().required(),
});

export const validateUserUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  joinDate: Joi.string(),
  jobDesk: Joi.string(),
  contact: Joi.string(),
  status: Joi.string(),
  profilePhoto: Joi.string(),
  password: Joi.string(),
});