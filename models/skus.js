async function querySkus(client, id) {
  const query = {
    text: 'SELECT * FROM skus WHERE id=$1',
    values: [id],
  };
  try {
    const response = await client.query(query);
    return response.rows[0];
  } catch (err) {
    console.error(err.stack);
    return null;
  }
}

module.exports = {
  querySkus,
};
