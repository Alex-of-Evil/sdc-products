const { queryProductList } = require('../models');
const { pool } = require('../db');

async function productListService(count) {
  const results = await queryProductList(pool, count);
  return results;
}

module.exports = {
  productListService,
}