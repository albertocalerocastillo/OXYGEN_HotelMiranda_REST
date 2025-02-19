import { Schema, model } from 'mongoose';
import { Contact } from '../interfaces/contact.interface';

const ContactSchema = new Schema({
  date: String,
  customer: String,
  email: String,
  phone: String,
  subject: String,
  comment: String,
  archived: Boolean,
});

export const ContactModel = model<Contact>('Contact', ContactSchema);