const products = [
  {
    descripcion: 'azucar',
    precio: 200,
    ganancia: 30
  },
  {
    descripcion: 'sal',
    precio: 100,
    ganancia: 30
  },
  {
    descripcion: 'gaseosa',
    precio: 300,
    ganancia: 30
  },
];

const getProducts = (req, res) => {
  res.render('products', {products});
};

module.exports = {getProducts}