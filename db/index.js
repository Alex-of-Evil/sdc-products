const { Pool } = require('pg');
const { POSTGRES_PW } = require('../postgres');

const pool = new Pool({
  user: 'postgres',
  host: 'sdc_db_1',
  database: 'products_api',
  password: POSTGRES_PW,
  port: '5432',
});

pool.on('error', (err) => {
  process.exit(-1);
});

module.exports = {
  pool,
};
