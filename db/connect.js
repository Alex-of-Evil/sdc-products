const { Sequelize } = require('sequelize');

async function connect() {
  const sequelize = new Sequelize('postgres://postgres:postgres@sdc_db_1');
  console.log('connecting to database...')
  try {
    await sequelize.authenticate();
    console.log('connection to db established');
  } catch (error) {
    console.error('unable to connect to db', error);
  }
  return sequelize;
}

module.exports = { connect };
