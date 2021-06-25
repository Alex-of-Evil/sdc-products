const { queryStyles, querySkus, queryPhotos } = require('../models');
const { pool } = require('../db');

async function stylesService(productId) {
  const client = await pool.connect();

  const stylesQ = queryStyles(client, productId);
  const skusQ = querySkus(client, productId);
  const photosQ = queryPhotos(client, productId);

  const results = await Promise.all([stylesQ, skusQ, photosQ]);
  console.log(results);
  client.release();
  return results;
}

module.exports = {
  stylesService,
}