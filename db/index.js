const { Sequelize, Model, DataTypes } = require('sequelize');

async function initDb() {
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

function init(sequelize) {
  console.log('created product model')
  class Product extends Model {}
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      field: 'product_name',
    },
    slogan: {
      type: DataTypes.TEXT,
    },
    productDescription: {
      type: DataTypes.TEXT,
      field: 'product_description',
    },
    category: {
      type: DataTypes.STRING,
    },
    defaultPrice: {
      type: DataTypes.STRING,
      field: 'default_price',
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
}

// Promise.all([connect()])
//   .then(([sequelize]) => {
//     init(sequelize);
//     db = sequelize;
//   });

const connection = initDb();
connection.connect();
init(connection);

module.exports = {
  connection,
};
