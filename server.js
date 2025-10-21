const express = require('express');
const app = express();
const server = require('http').createServer(app);
//path: '/assets/socket.io',
const io = require('socket.io')(server, {
  
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});

let pcSeleccionado = null;

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.emit('pc-seleccionado', pcSeleccionado);

  socket.on('seleccionar-pc', (pc) => {
    pcSeleccionado = pc;
    io.emit('pc-seleccionado', pc);
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});