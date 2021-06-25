const { queryProduct, queryFeatures } = require('../models');
const { pool } = require('../db');

async function productService(id) {
  const client = await pool.connect();

  const productQ = queryProduct(client, id);
  const featuresQ = queryFeatures(client, id);

  const [product, features] = await Promise.all([productQ, featuresQ]);

  product.features = features;

  client.release();
  return product;
}

module.exports = {
  productService,
}