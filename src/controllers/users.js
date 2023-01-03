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

module.exports = {getUser, userList}