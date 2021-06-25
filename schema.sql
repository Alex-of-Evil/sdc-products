-- CREATE DATABASE products_api;
  CREATE TABLE IF NOT EXISTS products(
    id SERIAL NOT NULL PRIMARY KEY,
    product_name VARCHAR(50),
    slogan text,
    product_description text,
    category VARCHAR(50),
    default_price INTEGER
  );

  COPY products(id, product_name, slogan, product_description, category, default_price)
  FROM '/raw/product.csv'
  DELIMITER ','
  CSV HEADER;

  CREATE TABLE IF NOT EXISTS features(
    id SERIAL NOT NULL PRIMARY KEY,
    product_id integer REFERENCES products,
    feature_name text,
    feature_value text
  );

  COPY features(id, product_id, feature_name, feature_value)
  FROM '/raw/features.csv'
  DELIMITER ','
  CSV HEADER;

  CREATE INDEX features_to_prod ON features (product_id);

  CREATE TABLE IF NOT EXISTS styles(
    style_id SERIAL NOT NULL PRIMARY KEY,
    product_id integer REFERENCES products,
    style_name VARCHAR(50),
    sale_price INTEGER,
    original_price INTEGER,
    is_default BOOLEAN
  );

  COPY styles(style_id, product_id, style_name, sale_price, original_price, is_default)
  FROM '/raw/styles.csv'
  WITH (
    FORMAT CSV,
    HEADER true,
    DELIMITER ',',
    null 'null'
  );

  CREATE INDEX styles_to_prod ON styles (product_id);

  CREATE TABLE IF NOT EXISTS skus(
    id SERIAL NOT NULL PRIMARY KEY,
    style_id integer REFERENCES styles,
    size VARCHAR(50),
    quantity integer
  );

  COPY skus(id, style_id, size, quantity)
  FROM '/raw/skus.csv'
  DELIMITER ','
  CSV HEADER;

  CREATE INDEX skus_to_styles ON skus (style_id);

  CREATE TABLE IF NOT EXISTS photos(
    id SERIAL NOT NULL PRIMARY KEY,
    style_id integer REFERENCES styles,
    photo_url text,
    thumbnail_url text
  );

  COPY photos(id, style_id, photo_url, thumbnail_url)
  FROM '/raw/skus.csv'
  DELIMITER ','
  CSV HEADER;

  CREATE INDEX photos_to_styles ON photos (style_id);

  CREATE TABLE IF NOT EXISTS related(
    id SERIAL NOT NULL PRIMARY KEY,
    current_product_id integer REFERENCES products,
    related_product_id integer
  );

  COPY related(id, current_product_id, related_product_id )
  FROM '/raw/related.csv'
  DELIMITER ','
  CSV HEADER;

  CREATE INDEX related_to_prod ON related (current_product_id);