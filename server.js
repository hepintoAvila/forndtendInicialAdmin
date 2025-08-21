const express = require('express');
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const port = 3000;
app.use(helmet());
app.use(cors({ origin: app }));
app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});