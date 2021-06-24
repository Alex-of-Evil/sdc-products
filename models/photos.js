async function queryPhotos(client, styleId) {
  const query = {
    text: 'SELECT photo_url, thumbnail_url FROM photos WHERE style_id=$1',
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
  queryPhotos,
};
