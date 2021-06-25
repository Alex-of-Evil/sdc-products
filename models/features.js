async function queryFeatures(client, productId) {
  const query = {
    text: 'SELECT feature_name AS name, feature_value AS value FROM features WHERE product_id=$1',
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
  queryFeatures,
};
