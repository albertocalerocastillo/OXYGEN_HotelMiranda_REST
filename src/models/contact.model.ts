import { model } from 'mongoose';
import { ContactSchema } from '../schemas/contact.schema';
import { Contact } from '../interfaces/contact.interface';

export const ContactModel = model<Contact>('Contact', ContactSchema);