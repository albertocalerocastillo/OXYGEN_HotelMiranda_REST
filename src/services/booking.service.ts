import { Booking } from '../interfaces/booking.interface';
import * as fs from 'fs';

const BOOKINGS_FILE = './src/data/bookings.json';

export const getBookings = async (): Promise<Booking[]> => {
  try {
    const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    throw new Error('Error al leer el archivo de reservas');
  }
};

export const getBooking = async (id: string): Promise<Booking | undefined> => {
  try {
    const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
    const bookings: Booking[] = JSON.parse(data);
    return bookings.find(b => b.id === id);
  } catch (error) {
    console.error(error);
    throw new Error('Error al leer el archivo de reservas');
  }
};

export const createBooking = async (booking: Booking): Promise<void> => {
  try {
    const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
    const bookings: Booking[] = JSON.parse(data);
    bookings.push(booking);
    await fs.promises.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear la reserva');
  }
};

export const updateBooking = async (id: string, updatedBooking: Booking): Promise<void> => {
  try {
    const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
    const bookings: Booking[] = JSON.parse(data);

    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) {
      throw new Error('Reserva no encontrada');
    }

    bookings[index] = { ...bookings[index], ...updatedBooking };
    await fs.promises.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar la reserva');
  }
};

export const deleteBooking = async (id: string): Promise<void> => {
  try {
    const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8');
    const bookings: Booking[] = JSON.parse(data);
    const updatedBookings = bookings.filter(b => b.id !== id);
    await fs.promises.writeFile(BOOKINGS_FILE, JSON.stringify(updatedBookings, null, 2));
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar la reserva');
  }
};