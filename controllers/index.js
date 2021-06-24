const services = require('../services');

async function getProductList(req, res) {
  const { count } = req.query;
  const serviceResponse = await services.productListService(count);
  res.send(serviceResponse);
}

async function getProduct(req, res) {
  const id = req.params.product_id;
  const serviceResponse = await services.productService(id);
  res.send(serviceResponse);
}

function getStyles(req, res) {
  res.send('got styles list');
}

async function getRelated(req, res) {
  const id = req.params.product_id;
  const serviceResponse = await services.relatedService(id);
  res.send(serviceResponse);
}

module.exports = {
  getProductList,
  getProduct,
  getStyles,
  getRelated,
}