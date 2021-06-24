const { db, product } = require('./index');

function productQuery(productId) {
  console.log('services');
  const query = product.findAll({
    where: {
      id: productId,
    },
  });
  return query;
}

module.exports = { productQuery };
