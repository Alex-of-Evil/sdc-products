const { queryProduct, queryFeatures } = require('../models');
const { pool } = require('../db');

async function productService(id) {
  const client = await pool.connect();
  const result = await queryProduct(client, id);
  const features = await queryFeatures(client, id);

  result.features = features;
  client.release();
  return result;
}

module.exports = {
  productService,
}