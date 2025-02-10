import express from 'express';
import { Request, Response } from 'express';
const { getRooms, getRoom } = require('./controllers/rooms.controller');

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola Mundo desde Express con TypeScript!');
});

app.get('/rooms', getRooms);
app.get('/rooms/:id', getRoom);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});