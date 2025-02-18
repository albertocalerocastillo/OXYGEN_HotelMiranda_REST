import { Schema, Types } from 'mongoose';
import { RoomSchema } from './room.schema';

export const BookingSchema = new Schema({
    guest: String,
    orderDate: String,
    checkInDate: String,
    checkInTime: String,
    checkOutDate: String,
    checkOutTime: String,
    specialRequest: String,
    room: { type: Types.ObjectId, ref: 'Room' },
    status: String,
    specialRequestType: String
});