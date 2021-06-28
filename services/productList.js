const { queryProductList } = require('../models');
const { pool } = require('../db');

async function productListService(count = 5, page = 1) {
  const start = parseInt((page - 1) * count + 1, 10);
  const end = parseInt(page * count, 10);
  const results = await queryProductList(pool, start, end);
  return results;
}

module.exports = {
  productListService,
}