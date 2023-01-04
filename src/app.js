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


// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/root.html'));
});

// Ruta productos
app.get('/productos', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/productos.html'));
});

// Ruta producto 1
app.get('/productos/1', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/producto1.html'));
});


// Definir directorio public
app.use(express.static('../public'));

// Lo mismo pero con otra url '/miurl'
app.use('/miurl', express.static('../public'));

// Configurar motor de vistas (activar ejs)
app.set('view engine', 'ejs');

// Definir ruta para el ejs
app.get('/ejs', (req, res) => {
  const usuario = {
    nombre: 'Facu',
    apellido: 'Martinez'
  }

  res.render('../views/index', {usuario});
});

// Requerir y setear body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


// Usar morgan
const morgan = require('morgan');
app.use(morgan('dev'));

// Requerir y usar las rutas de usuarios
// Esto sirve para TODAS las rutas del archivo users.js
const usersRoute = require('./routes/users');
app.use(usersRoute);


// Rutas de products
const productsRoute = require('./routes/products');
app.use(productsRoute)

// Definir carpeta de views
app.set('views', __dirname + '/views');

// Middleware para manejar errores

app.use((err, req, res, next) => {
  res.json({
    error: err.message
  });
  next();
});