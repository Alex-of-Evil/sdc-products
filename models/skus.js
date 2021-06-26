async function querySkus(client, styleId) {
  const text = `
    SELECT json_agg(skus_array)
    AS skus
    FROM (
      SELECT json_build_object(
        (SELECT sku),
        (SELECT json_build_object)
      )
      AS skus_array
      FROM
      (
        SELECT
        id AS sku, json_build_object(
          'size', (
            SELECT size
          ),
          'quantity', (
            SELECT quantity
          )
        )
        FROM
        (
        SELECT id, size, quantity
        FROM skus
        WHERE style_id=1
        ) AS m
      ) AS q
    ) as z
  `

  const query = {
    text,
    values: [styleId],
  };
  try {
    const response = await client.query(query);
    console.log(response);
    return response.rows;
  } catch (err) {
    console.error(err.stack);
    return null;
  }
}

module.exports = {
  querySkus,
};
