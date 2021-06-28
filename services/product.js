const { queryProduct } = require('../models');
const { pool } = require('../db');

async function productService(productId) {
  const product = await queryProduct(pool, productId);
  return product;
}

module.exports = {
  productService,
}