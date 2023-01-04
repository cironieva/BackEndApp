const {Router} = require('express');
const router = Router();
const productsController = require('../controllers/products');

router.get('/products', productsController.getProducts);

module.exports = router;