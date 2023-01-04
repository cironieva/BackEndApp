// Requerir el router
const {Router} = require('express');
const router = Router();
// Requerir la lógica del controller
const userController = require('../controllers/users');

// Ruta con req.params
router.get('/users/:id', userController.getUser);

// Ruta para la lista
router.get('/users', userController.userList)



// Ruta obtener vista
router.get('/form', userController.obtenerVista);

// Ruta procesar form
router.post('/form', userController.procesarForm);


module.exports = router;