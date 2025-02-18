import { Schema } from 'mongoose';

export const ContactSchema = new Schema({
    date: String,
    customer: String,
    email: String,
    phone: String,
    subject: String,
    comment: String,
    archived: Boolean
});