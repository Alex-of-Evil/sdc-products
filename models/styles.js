async function queryStyles(client, productId) {
  const query = {
    text: `SELECT jsonb_agg(x) FROM (
            SELECT style_id, style_name AS name, original_price, sale_price, is_default AS "default?" FROM styles WHERE product_id=$1
          ) x`,

    values: [productId],
  };
  try {
    const response = await client.query(query);
    return response.rows[0].jsonb_agg;
  } catch (err) {
    console.error(err.stack);
    return null;
  }
}

module.exports = {
  queryStyles,
};
`
SELECT jsonb_agg(x) FROM (


  (
    SELECT
      s.style_name AS name, s.style_id, s.product_id, s.sale_price, s.original_price, s.is_default AS "default?",
      st.sku, st.size, st.quantity
    FROM (
      SELECT style_id, id AS sku, size, quantity
      FROM skus
      WHERE style_id IN (
        SELECT style_id
        FROM styles
        WHERE product_id=1
      )
    ) AS st
    INNER JOIN styles s
    ON st.style_id = s.style_id
  )





      SELECT style_id, json_build_object(
        'url', (
          SELECT photo_url
          ),
        'thumbnail_url', (
          SELECT thumbnail_url
          )
        )
      FROM (
        SELECT style_id, photo_url, thumbnail_url
        FROM photos
        WHERE style_id IN (
          SELECT style_id
          FROM styles
          WHERE product_id=1
        )
      ) AS p_inner





  ;



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

) x
``