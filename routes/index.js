const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get(':product_id', (req, res) => {
  res.send(`got id ${req.params.product_id}`);
  console.log(`GET on id ${req.params}`);
  res.send('got');
  console.log('got')
router.get('/', controllers.getProductList);

});
router.get('/:product_id', controllers.getProduct);

router.get('/:product_id/styles', controllers.getStyles);

router.get('/:product_id/related', controllers.getRelated);

module.exports = router;
