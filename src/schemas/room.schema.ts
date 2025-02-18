import { Schema } from 'mongoose';

export const RoomSchema = new Schema({
    photo: String,
    number: String,
    name: String,
    type: String,
    amenities: String,
    price: Number,
    offerPrice: Number,
    status: String,
    description: String,
    capacity: Number
});