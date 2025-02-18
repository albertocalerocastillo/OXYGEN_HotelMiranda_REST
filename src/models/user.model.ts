import { model } from 'mongoose';
import { UserSchema } from '../schemas/user.schema';
import { User } from '../interfaces/user.interface';

export const UserModel = model<User>('User', UserSchema);