const { queryRelated } = require('../models');
const { pool } = require('../db');

function shapeResults(results) {
  return results.map((array) => array[0]);
}

async function relatedService(productId) {
  const query = await queryRelated(pool, productId);
  const results = shapeResults(query);
  return results;
}

module.exports = {
  relatedService,
}