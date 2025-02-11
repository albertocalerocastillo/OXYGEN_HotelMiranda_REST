import express, { Request, Response } from 'express';
import { getBookings, getBooking, createBooking, updateBooking, deleteBooking } from '../services/booking.service';

export const getBookingsController = async (req: Request, res: Response) => {
  try {
    const bookings = await getBookings();
    res.json(bookings);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    } else {
      console.error('Error desconocido:', error);
      res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
    }
  }
};

export const getBookingController = async (req: Request, res: Response) => {
  try {
    const booking = await getBooking(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json(booking);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    } else {
      console.error('Error desconocido:', error);
      res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
    }
  }
};

export const createBookingController = async (req: Request, res: Response) => {
  try {
    const booking = req.body;
    await createBooking(booking);
    res.status(201).json({ message: 'Reserva creada con éxito' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    } else {
      console.error('Error desconocido:', error);
      res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
    }
  }
};

export const updateBookingController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedBooking = req.body;
    await updateBooking(id, updatedBooking);
    res.status(200).json({ message: 'Reserva actualizada con éxito' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    } else {
      console.error('Error desconocido:', error);
      res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
    }
  }
};

export const deleteBookingController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteBooking(id);
    res.status(200).json({ message: 'Reserva eliminada con éxito' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    } else {
      console.error('Error desconocido:', error);
      res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
    }
  }
};

const router = express.Router();

router.get('/', getBookingsController);
router.get('/:id', getBookingController);
router.post('/', createBookingController);
router.put('/:id', updateBookingController);
router.delete('/:id', deleteBookingController);

export const bookingRoutes = router;

export const bookingEndpoint = {
  path: '/bookings',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  private: true
};