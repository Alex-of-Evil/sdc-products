async function queryFeatures(client, id) {
  const query = {
    text: 'SELECT feature_name, feature_value FROM features WHERE product_id=$1',
    values: [id],
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
