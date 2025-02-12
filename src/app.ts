import express, { Request, Response } from 'express';
import { roomRoutes, roomEndpoint } from './controllers/rooms.controller';
import { bookingRoutes, bookingEndpoint } from './controllers/bookings.controller';
import { authMiddleware } from './middleware/auth';
import { login } from './controllers/login.controller';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/login', login);
app.use('/rooms', authMiddleware, roomRoutes);
app.use('/bookings', authMiddleware, bookingRoutes);

app.get('/', (req: Request, res: Response) => {
  const hotelData = {
    name: 'Hotel Miranda',
    endpoints: [
      roomEndpoint,
      bookingEndpoint
    ]
  };
  res.json(hotelData);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

require('dotenv').config();