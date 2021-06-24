async function querySkus(client, styleId) {
  const query = {
    text: 'SELECT id, size, quantity FROM skus WHERE style_id=$1',
    values: [styleId],
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
  querySkus,
};
