import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { RoomModel } from './src/models/RoomModel';
import { BookingModel } from './src/models/BookingModel';
import { UserModel } from './src/models/UserModel';
import { ContactModel } from './src/models/ContactModel';
import { connectDB } from './database';
import 'dotenv/config';
import bcrypt from 'bcrypt';

async function main() {
  await connectDB();

  async function generateContacts() {
    const date = faker.date.anytime();
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const phone = faker.phone.number();
    const comment = faker.lorem.paragraph();
    const archived = faker.datatype.boolean();

    const contact = new ContactModel({
      date,
      customer: name,
      email,
      phone,
      subject: faker.lorem.sentence(),
      comment,
      archived,
    });

    await contact.save();
  }

  async function generateBookings() {
    const guest = faker.person.fullName();
    const orderDate = faker.date.anytime();
    const checkInDate = faker.date.future();
    const checkInTime = faker.date.recent().toLocaleTimeString();
    const checkOutDate = faker.date.future();
    const checkOutTime = faker.date.recent().toLocaleTimeString();
    const specialRequest = faker.lorem.sentence();
    const status = faker.helpers.arrayElement(['Booked', 'Refund', 'Pending', 'Canceled']);
    const specialRequestType = faker.lorem.word();

    const booking = new BookingModel({
      guest,
      orderDate,
      checkInDate,
      checkInTime,
      checkOutDate,
      checkOutTime,
      specialRequest,
      room: null,
      status,
      specialRequestType,
    });

    await booking.save();
  }

  async function generateRooms() {
    const photo = faker.image.url();
    const number = faker.number.int({ min: 1, max: 9999 }).toString();
    const name = faker.lorem.sentence();
    const type = faker.lorem.word();
    const amenities = faker.lorem.sentence();
    const price = faker.number.int();
    const offerPrice = faker.number.int();
    const status = faker.helpers.arrayElement(['Available', 'Booked']);
    const description = faker.lorem.paragraph();
    const capacity = faker.number.int();

    const room = new RoomModel({
      photo,
      number,
      name,
      type,
      amenities,
      price,
      offerPrice,
      status,
      description,
      capacity,
    });

    await room.save();
  }

  async function generateUsers() {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const joinDate = faker.date.past();
    const jobDesk = faker.person.jobTitle();
    const contact = faker.phone.number();
    const status = faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']);
    const profilePhoto = faker.image.avatar();
    const password = 'admin';

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      joinDate,
      jobDesk,
      contact,
      status,
      profilePhoto,
      password: hashedPassword,
    });

    await user.save();
  }

  for (let i = 0; i < 1; i++) {
    await generateContacts();
    await generateBookings();
    await generateRooms();
    await generateUsers();
  }
}

main();