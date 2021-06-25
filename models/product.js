async function queryProduct(client, productId) {
  const query = {
    text: 'SELECT * FROM products WHERE id=$1',
    values: [productId],
  };
  try {
    const response = await client.query(query);
    return response.rows[0];
  } catch (err) {
    console.error(err.stack);
    return null;
  }
}

async function queryProductList(client, count = 5) {
  const query = {
    text: 'SELECT * FROM products WHERE id BETWEEN $1 and $2',
    values: [1, count],
  };
  try {
    const response = await client.query(query);
    return response.rows;
  } catch (err) {
    console.error(err.stack);
    return null;
  }
}

module.exports = {
  queryProduct,
  queryProductList,
};
