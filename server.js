const newrelic = require('newrelic');
const express = require('express');
const router = require('./routes');

const port = 80;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is up');
});

app.use('/products', router);

app.listen(port, console.log(`Listening on port ${port}...`));
