const { queryStyles, querySkus, queryPhotos } = require('../models');
const { pool } = require('../db');

async function stylesService(productId) {
  const client = await pool.connect();

  const styles = await queryStyles(client, productId);
  const skus = await querySkus(client, style.style_id);


  // const res = await Promise.all([skus]);

  client.release();

  return styles;
}

module.exports = {
  stylesService,
}