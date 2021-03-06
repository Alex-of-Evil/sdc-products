async function queryStyles(client, productId) {
  const query = {
    text: `
    SELECT json_build_object(
      'product_id', $1,
      'results',
      json_agg(complete)
    )
    FROM (
      SELECT
        style_id,
        name,
        original_price,
        sale_price,
        is_default,
        photos_arr AS photos,
        skus
      FROM (
        SELECT *
        FROM (
          SELECT styleq.style_id, styleq.name, styleq.original_price, styleq.sale_price, styleq.is_default
          FROM (
            SELECT
              style_id,
              style_name AS name,
              original_price,
              sale_price,
              is_default
            FROM styles
            WHERE product_id=$1
          ) styleq
        )
        AS styleq2
        LEFT JOIN (
          SELECT style_id AS pstyle_id, json_agg(
            json_build_object(
              'thumbnail_url', (SELECT thumbnail_url),
              'url', (SELECT photo_url)
            )
          ) AS photos_arr
          FROM photos
          WHERE style_id IN (
            SELECT style_id
            FROM styles
            WHERE product_id=$1
          )
          GROUP BY style_id
        ) photoq
        ON photoq.pstyle_id = styleq2.style_id
        LEFT JOIN (
          SELECT style_id AS sstyle_id, json_object_agg(
            (SELECT sku),
            (SELECT json_build_object)
          )
          AS skus
          FROM
          (
            SELECT
            id AS sku, style_id, json_build_object(
              'size', (
                SELECT size
              ),
              'quantity', (
                SELECT quantity
              )
            )
            FROM
            (
            SELECT style_id, id, size, quantity
            FROM skus
            WHERE style_id IN (
              SELECT style_id
              FROM styles
              WHERE product_id=$1
            )
            ) AS mmmm
          ) AS qqqq
          GROUP BY style_id
        ) skuq
        ON skuq.sstyle_id = styleq2.style_id
      ) AS styleskuphoto
    ) AS complete
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

module.exports = {
  queryStyles,
};
