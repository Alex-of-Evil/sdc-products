const { productService } = require('../services');

function getProductList() {

}

async function getProduct(req, res) {
  const id = req.params.product_id;
  const query = await productService(id);
  console.log('sending response...');
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