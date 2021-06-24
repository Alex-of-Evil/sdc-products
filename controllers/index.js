const services = require('../services');

async function getProductList(req, res) {
  const { count} = req.query;
  const query = await services.productListService(count);
  res.send(query);
}

async function getProduct(req, res) {
  const id = req.params.product_id;
  const query = await services.productService(id);
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