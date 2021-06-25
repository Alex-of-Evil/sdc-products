const { queryStyles, querySkus, queryPhotos } = require('../models');
const { pool } = require('../db');

function skusPerStyle() {

}

function photosPerStyle() {

}

async function stylesService(productId) {
  const client = await pool.connect();

  const styles = await queryStyles(client, productId);

  return styles;
}

module.exports = {
  stylesService,
}