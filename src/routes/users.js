// Requerir el router
const {Router} = require('express');
const router = Router();
// Requerir la lógica del controller
const userController = require('../controllers/users');

// Requerir validator
const {body} = require('express-validator');


// Ruta con req.params
router.get('/users/:id', userController.getUser);

// Ruta para la lista
router.get('/users', userController.userList)



// Ruta obtener vista
router.get('/form', userController.obtenerVista);

// Ruta procesar form
// ahora con validación de que el apellido tenga 3 caracteres
// si la validación no se cumple muestra un error con mensaje
router.post('/form',
body('lastname').isLength({min:3}).withMessage('el apellido debe tener más de dos caracteres'),
body('name').trim().notEmpty().withMessage('El nombre no puede estar vacío'),
userController.procesarForm);


module.exports = router;