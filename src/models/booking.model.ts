import { model } from 'mongoose';
import { BookingSchema } from '../schemas/booking.schema';
import { Booking } from '../interfaces/booking.interface';

export const BookingModel = model<Booking>('Booking', BookingSchema);