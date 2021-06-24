const { queryProduct } = require('./product');
const { queryFeatures } = require('./features');
const { querySkus } = require('./skus');
const { queryPhotos } = require('./photos');
const { queryStyles } = require('./styles');
const { queryRelated } = require('./related');

module.exports = {
  queryProduct,
  queryFeatures,
  querySkus,
  queryPhotos,
  queryStyles,
  queryRelated,
}