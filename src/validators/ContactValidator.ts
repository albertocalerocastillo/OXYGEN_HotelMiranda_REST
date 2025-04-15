import Joi from 'joi';

export const validateContactCreate = Joi.object({
  date: Joi.string().required(),
  customer: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  subject: Joi.string().required(),
  comment: Joi.string(),
  archived: Joi.boolean(),
});