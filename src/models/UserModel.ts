import { Schema, model } from 'mongoose';
import { User } from '../interfaces/UserInterface';

const UserSchema = new Schema({
  name: String,
  email: String,
  joinDate: String,
  jobDesk: String,
  contact: String,
  status: String,
  profilePhoto: String,
  password: { type: String, select: false },
});

export const UserModel = model<User>('User', UserSchema);