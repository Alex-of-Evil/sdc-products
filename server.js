const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '/public')));

app.listen(80);

console.log('Listening on port 80...');

// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'sdc_db_1',
//   database: 'products_api',
//   password: 'postgres',
//   port: '5432',
// });

// pool.on('error', (err) => {
//   console.error('Unexpected error on idle client', err);
//   process.exit(-1);
// });

// module.exports = {
//   pool,
// };
