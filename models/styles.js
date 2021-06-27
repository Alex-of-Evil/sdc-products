async function queryStyles(client, productId) {
  const query = {
    text: `
    SELECT json_agg(json_build_object(
      'style_id', (SELECT style_id),
      'name', (SELECT name),
      'original_price', (SELECT original_price),
      'sale_price', (SELECT sale_price),
      'default?', (SELECT is_default),
      'photos', (SELECT photos_arr),
      'skus', (SELECT skus_obj)
    )) AS results
    FROM (
      SELECT
        style_id,
        name,
        original_price,
        sale_price,
        is_default,
        photos_arr,
        skus_obj
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
        ) AS styleq2
        LEFT JOIN (
          SELECT style_id AS pstyle_id, json_agg(
            json_build_object(
            'url', (
              SELECT photo_url
              ),
            'thumbnail_url', (
              SELECT thumbnail_url
              )
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
          SELECT
            style_id AS sstyle_id, json_agg(skus_array) AS skus_obj
          FROM (
            SELECT style_id, json_build_object(
              (SELECT sku),
              (SELECT json_build_object)
            )
            AS skus_array
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
                WHERE product_id=1
              )
              ) AS mmmm
            ) AS qqqq
          ) AS zzz
          GROUP BY sstyle_id
        ) skuq
        ON skuq.sstyle_id = styleq2.style_id
      ) AS styleskuphoto
    ) AS finally
    `,

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
  queryStyles,
};
/*
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




    SELECT
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


--------------------photos (1 row per style) ---------------------
SELECT style_id, json_agg(
    json_build_object(
    'url', (
      SELECT photo_url
      ),
    'thumbnail_url', (
      SELECT thumbnail_url
      )
    )
  ) AS photos_arr
FROM photos
WHERE style_id IN (
  SELECT style_id
  FROM styles
  WHERE product_id=1
)
GROUP BY style_id;
-------------------------------------------------------------------

----------------------skus (1 row per style) -----------------------

SELECT
  style_id AS sstyle_id, json_agg(skus_array) AS skus
FROM (
  SELECT style_id, json_build_object(
    (SELECT sku),
    (SELECT json_build_object)
  )
  AS skus_array
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
      WHERE product_id=1
    )
    ) AS mmmm
  ) AS qqqq
) AS zzz
GROUP BY sstyle_id;

--------------------------------------------------------------------

-----------------------------------styles-----

SELECT style_id, row_to_json(styleq) AS styles_arr
FROM (
  SELECT
    style_id,
    style_name AS name,
    original_price,
    sale_price,
    is_default AS "default?"
  FROM styles
  WHERE product_id=1
) styleq;

---------------all---------------------------------------------
SELECT json_build_object(
  'style_id', (SELECT style_id),
  'name', (SELECT name),
  'original_price', (SELECT original_price),
  'sale_price', (SELECT sale_price),
  'default?', (SELECT is_default),
  'photos', (SELECT photos_arr),
  'skus', (SELECT skus_obj)
)
FROM (
  SELECT
    style_id,
    name,
    original_price,
    sale_price,
    is_default,
    photos_arr,
    skus_obj
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
        WHERE product_id=1
      ) styleq
    ) AS styleq2
    LEFT JOIN (
      SELECT style_id AS pstyle_id, json_agg(
        json_build_object(
        'url', (
          SELECT photo_url
          ),
        'thumbnail_url', (
          SELECT thumbnail_url
          )
        )
      ) AS photos_arr
      FROM photos
      WHERE style_id IN (
        SELECT style_id
        FROM styles
        WHERE product_id=1
      )
      GROUP BY style_id
    ) photoq
    ON photoq.pstyle_id = styleq2.style_id
    LEFT JOIN (
      SELECT
        style_id AS sstyle_id, json_agg(skus_array) AS skus_obj
      FROM (
        SELECT style_id, json_build_object(
          (SELECT sku),
          (SELECT json_build_object)
        )
        AS skus_array
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
            WHERE product_id=1
          )
          ) AS mmmm
        ) AS qqqq
      ) AS zzz
      GROUP BY sstyle_id
    ) skuq
    ON skuq.sstyle_id = styleq2.style_id
  ) AS styleskuphoto
) AS finally
;


``


{
  "style_id":6,"name":"Dark Grey & Black","original_price":170,"sale_price":null,"default?":false
}   |
[
  {
    "url" : "https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    "thumbnail_url" : "https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
  },
  {
    "url" : "https://images.unsplash.com/photo-1519689373023-dd07c7988603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
    "thumbnail_url" : "https://images.unsplash.com/photo-1519689373023-dd07c7988603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
  },
  {
    "url" : "https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80",
    "thumbnail_url" : "https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  }
]                                                      |
[
  {
    "31" : {
      "size" : "XS", "quantity" : 8
    }
  }
]
*/

SELECT
style_id AS sstyle_id, json_agg(skus_array) AS skus_obj
FROM (
SELECT style_id, json_build_object(
  (SELECT sku),
  (SELECT json_build_object)
)
AS skus_array
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
    WHERE product_id=1
  )
  ) AS mmmm
) AS qqqq
) AS zzz
GROUP BY sstyle_id