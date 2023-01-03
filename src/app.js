// Requerir express
const express = require('express');
const path = require('path');
// Instanciar express
const app = express();
// Definir el puerto
const PORT = 3000;

// Poner el server en escucha y avisar por consola
app.listen(PORT, () => console.log('listening on port', PORT));

// Crear una ruta
app.get('/home', (req, res) => {
  res.send('Hola! bienvenidos a mi primer server!');
});

// Devolver una vista
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});