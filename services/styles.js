const { queryStyles, querySkus, queryPhotos } = require('../models');
const { pool } = require('../db');

async function stylesService(productId) {
  const client = await pool.connect();

  const styles = await queryStyles(client, productId);
  const queries = [];
  styles.forEach(async (row) => {
    const style = row;
    const skus = querySkus(client, style.style_id);
    const photos = queryPhotos(client, style.style_id);
    style.skus = skus;
    style.photos = photos;
    queries.push(style.skus);
    queries.push(style.photos);
  });

  const res = await Promise.all([queries]);

  client.release();

  return styles;
}

module.exports = {
  stylesService,
}