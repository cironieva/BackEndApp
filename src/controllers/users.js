const bodyParser = require("body-parser");

// Lista de usuarios
const usuarios = [{
  id: 1,
  nombre: 'Facundo',
  apellido: 'Martinez'
},
{
  id: 2,
  nombre: 'Ana',
  apellido: 'Bendezu'
},
{
  id: 3,
  nombre: 'Juelieta',
  apellido: 'Tacconi'
}
];

// Función que devuelve el usuario que coincida con el id del req.param
const getUser = (req, res) => {

  const id = req.params.id;
  const usuario = usuarios.filter((u => u.id == id))[0];
  res.json(usuario);
}

// Función que devuelve toda la lista de usuarios
const userList = (req, res) => {
  res.json(usuarios)
}


// Función que obtiene vista del form
const obtenerVista = (req, res) => {
  res.render('form');
}

// Funcion que procesa el form
const procesarForm = (req, res) => {
  const user = req.body;
  res.render('vistaUsuario', {user});
}

module.exports = {getUser, userList, obtenerVista, procesarForm}