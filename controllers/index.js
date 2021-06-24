const { productService } = require('../services');

function getProductList() {

}

async function getProduct(req, res) {
  console.log('controller');
  const query = productService(1);
  console.log('sending response...')
  res.send(query);
}

function getStyles() {

}

function getRelated() {

}

module.exports = {
  getProductList,
  getProduct,
  getStyles,
  getRelated,
}