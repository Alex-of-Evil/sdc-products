async function queryRelated(client, productId) {
  const query = {
    text: 'SELECT related_product_id FROM related WHERE current_product_id=$1',
    values: [productId],
    rowMode: 'array',
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
  queryRelated,
};
