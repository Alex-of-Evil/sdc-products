const { queryStyles } = require('../models');
const { pool } = require('../db');

async function stylesService(productId) {
  const styles = await queryStyles(pool, productId);
  return styles;
}

module.exports = {
  stylesService,
}