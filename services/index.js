const { queryProduct, queryFeatures } = require('../models');
const { pool } = require('../db');

function shapeFeatures(features) {
  features.forEach((row) => {
    delete Object.assign(row, { name: row.feature_name }).feature_name;
    delete Object.assign(row, { value: row.feature_value }).feature_value;
  });
}

async function productService(id) {
  const client = await pool.connect();
  const result = await queryProduct(client, id);
  const features = await queryFeatures(client, id);

  shapeFeatures(features);

  result.features = features;
  client.release();
  return result;
}

module.exports = {
  productService,
};
