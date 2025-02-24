import Joi from 'joi';

export const validateBookingCreate = Joi.object({
  guest: Joi.string().required(),
  orderDate: Joi.string().required(),
  checkInDate: Joi.string().required(),
  checkInTime: Joi.string().required(),
  checkOutDate: Joi.string().required(),
  checkOutTime: Joi.string().required(),
  specialRequest: Joi.string(),
  roomType: Joi.string().required(),
  status: Joi.string().required(),
  specialRequestType: Joi.string(),
});