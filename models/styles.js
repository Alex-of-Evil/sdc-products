async function queryStyles(client, productId) {
  const query = {
    text: 'SELECT * FROM styles WHERE product_id=$1',
    values: [productId],
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
  queryStyles,
};
