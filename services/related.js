const { queryRelated } = require('../models');
const { pool } = require('../db');

async function relatedService(productId) {
  const query = await queryRelated(pool, productId);
  return query;
}

module.exports = {
  relatedService,
}