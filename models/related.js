async function queryRelated(client, productId) {
  const query = {
    text: 'SELECT array_agg(related_product_id) FROM (SELECT related_product_id FROM related WHERE current_product_id=$1) AS b',
    values: [productId],
  };
  try {
    const response = await client.query(query);
    console.log(response.rows[0].array_agg);
    return response.rows[0].array_agg;
  } catch (err) {
    console.error(err.stack);
    return null;
  }
}

module.exports = {
  queryRelated,
};
