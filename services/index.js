const { productQuery } = require('../db/product');

function productService() {
  const result = productQuery();
  return result;
}

module.exports = {
  productService,
}