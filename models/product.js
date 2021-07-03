async function queryProduct(client, productId) {
  const query = {
    text: `
      SELECT
      json_build_object(
        'id', (SELECT id),
        'name', (SELECT product_name),
        'slogan', (SELECT slogan),
        'description', (SELECT product_description),
        'category', (SELECT category),
        'default_price', (SELECT default_price),
        'features', (SELECT features_arr)
      )
      FROM (
        SELECT
          *
        FROM
          products, (
            SELECT
            json_agg(json_build_object(
              'feature', (SELECT feature_name),
              'value', (SELECT feature_value)
            ))
            AS features_arr
            FROM
            features
            WHERE
            product_id=$1
            ) AS feat
        WHERE id=$1
      ) AS prod
    `,
    values: [productId],
  };
  try {
    const response = await client.query(query);
    return response.rows[0].json_build_object;
  } catch (err) {
    return null;
  }
}

async function queryProductList(client, start, end) {
  const query = {
    text: 'SELECT * FROM products WHERE id BETWEEN $1 and $2',
    values: [start, end],
  };
  try {
    const response = await client.query(query);
    return response.rows;
  } catch (err) {
    return null;
  }
}

module.exports = {
  queryProduct,
  queryProductList,
};
