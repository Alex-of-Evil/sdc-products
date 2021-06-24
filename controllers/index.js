const { productService } = require('../services');

function getProductList(req, res) {
  res.send('got product list');
}

async function getProduct(req, res) {
  const id = req.params.product_id;
  const query = await productService(id);
  console.log('sending response...');
  res.send(query);
}

function getStyles(req, res) {
  res.send('got styles list');
}

function getRelated(req, res) {
  res.send('got related list');
}

module.exports = {
  getProductList,
  getProduct,
  getStyles,
  getRelated,
}