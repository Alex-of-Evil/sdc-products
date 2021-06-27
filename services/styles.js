const { queryStyles, querySkus, queryPhotos } = require('../models');
const { pool } = require('../db');

async function stylesService(productId) {
  const client = await pool.connect();

  const styles = await queryStyles(client, productId);

  client.release();

  return styles;
}

module.exports = {
  stylesService,
}