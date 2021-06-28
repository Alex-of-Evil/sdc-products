const services = require('../services');

async function getProductList(req, res) {
  const { count, page } = req.query;
  const serviceResponse = await services.productListService(count, page);
  res.send(serviceResponse);
}

async function getProduct(req, res) {
  const id = req.params.product_id;
  const serviceResponse = await services.productService(id);
  res.send(serviceResponse);
}

async function getStyles(req, res) {
  const id = req.params.product_id;
  const serviceResponse = await services.stylesService(id);
  res.send(serviceResponse);
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