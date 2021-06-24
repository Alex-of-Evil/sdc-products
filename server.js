const express = require('express');
const path = require('path');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is up');
});

app.use('/products', router);

app.listen(80);

console.log('Listening on port 80...');
