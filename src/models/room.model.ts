import { model } from 'mongoose';
import { RoomSchema } from '../schemas/room.schema';
import { Room } from '../interfaces/room.interface';

export const RoomModel = model<Room>('Room', RoomSchema);