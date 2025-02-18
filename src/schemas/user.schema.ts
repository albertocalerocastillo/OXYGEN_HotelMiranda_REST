import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    name: String,
    email: String,
    joinDate: String,
    jobDesk: String,
    contact: String,
    status: String,
    profilePhoto: String,
    password: { type: String, select: false }
});