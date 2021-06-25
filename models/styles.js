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
