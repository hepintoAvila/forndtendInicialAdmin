const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
 
const port = 3000;
app.use(helmet());
app.use(cors({ origin: app }));

app.get('/api2025/', (req, res) => {
  res.send('Hola, mundo!');
});
let solicitudes = [];

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Enviar solicitudes actuales al usuario conectado
    socket.emit('solicitudes', solicitudes);

    // Escuchar evento de nueva solicitud
    socket.on('nueva-solicitud', (solicitud) => {
        solicitudes.push(solicitud);
        io.emit('nueva-solicitud', solicitud);
    });

    // Escuchar evento de solicitud aceptada
    socket.on('aceptar-solicitud', (idSolicitud) => {
        // Buscar la solicitud y actualizar su estado
        const solicitud = solicitudes.find((s) => s.id === idSolicitud);
        if (solicitud) {
            solicitud.estado = 'aceptada';
            io.emit('solicitud-aceptada', solicitud);
        }
    });
});
server.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
});