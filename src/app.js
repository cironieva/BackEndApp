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

// Requerir cookie-parser, express-session y bcryptjs
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const bcrypt = require('bcryptjs');

// Activar solo cookie y session
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: '123456',
  saveUninitialized: true,
  cookie: {maxAge: oneDay},
  resave: false
}));


// Ruta para get cookies
app.get('/get-cookie', (req, res) => {
  const cookies = req.cookies;
  res.json({cookies});
  console.log(cookies);
});

// Ruta para set cookies desde querys de URL
app.get('/set-cookie', (req, res) => {
  const {nombre, apellido} = req.query;
  
  res.cookie('nombre', nombre, {maxAge: 5000});
  res.cookie('apellido', apellido, {maxAge: 5000});

  res.send('Cookies seteadas');
});


// Ruta para get sessions
app.get('/get-sessions', (req, res) => {
  const sessions = req.session;
  res.json({sessions});
  console.log(sessions);
});

// Ruta para set sessions desde querys de URL
app.get('/set-sessions', (req, res) => {
  const session = req.query;
  
  req.session.session = session;

  res.send(session);
});


// Ruta que hashea una password enviada en query
app.get('/password-hashed', (req, res) => {
  const passwordPlain = req.query.password;
  const passwordHashed = bcrypt.hashSync(passwordPlain, 10);

  res.send(passwordHashed);
});

// Ruta que valida la contraseña correcta

const hash = '$2a$10$z.LR6Y9kcWx.8/Em8Z1bbeK94bdo8G9tLQtQJYmArml8y3ffi1nFi';

app.get('/password-validated', (req, res) => {
  const passwordPlain = req.query.password;
  const isValid = bcrypt.compareSync(passwordPlain, hash);
  
  res.send(isValid);
});