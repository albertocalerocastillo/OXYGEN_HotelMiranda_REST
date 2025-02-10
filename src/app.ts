const express = require('express');
const { getRooms } = require('./controllers/rooms.controller');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde Express con TypeScript!');
});

app.get('/rooms', getRooms);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});