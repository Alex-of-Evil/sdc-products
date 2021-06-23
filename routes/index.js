const express = require('express');

const router = express.Router();

router.get(':product_id', (req, res) => {
  res.send(`got id ${req.params.product_id}`);
  console.log(`GET on id ${req.params}`);
  res.send('got');
  console.log('got')

});

module.exports = router;
