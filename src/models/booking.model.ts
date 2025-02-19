import { Schema, model, Types } from 'mongoose';
import { Booking } from '../interfaces/booking.interface';

const BookingSchema = new Schema({
  guest: String,
  orderDate: String,
  checkInDate: String,
  checkInTime: String,
  checkOutDate: String,
  checkOutTime: String,
  specialRequest: String,
  room: { type: Types.ObjectId, ref: 'Room' },
  status: String,
  specialRequestType: String,
});

export const BookingModel = model<Booking>('Booking', BookingSchema);