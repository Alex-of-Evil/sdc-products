async function queryPhotos(client, styleId) {
  const query = {
    text: 'SELECT photo_url AS url, thumbnail_url FROM photos WHERE style_id=$1',
    values: [styleId],
  };
  try {
    const response = await client.query(query);
    return response.rows;
  } catch (err) {
    return null;
  }
}

module.exports = {
  queryPhotos,
};
