import { Schema, model } from 'mongoose';
import { Room } from '../interfaces/room.interface';

const RoomSchema = new Schema({
  photo: String,
  number: String,
  name: String,
  type: String,
  amenities: String,
  price: Number,
  offerPrice: Number,
  status: String,
  description: String,
  capacity: Number,
});

export const RoomModel = model<Room>('Room', RoomSchema);