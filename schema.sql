CREATE DATABASE products_api
  CREATE TABLE IF NOT EXISTS products(
    id SERIAL NOT NULL PRIMARY KEY,
    product_name VARCHAR(50),
    slogan text,
    product_description text,
    category VARCHAR(50),
    default_price VARCHAR(50)
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

  CREATE TABLE IF NOT EXISTS styles(
    style_id SERIAL NOT NULL PRIMARY KEY,
    product_id integer REFERENCES products,
    style_name VARCHAR(50),
    sale_price VARCHAR(50),
    original_price VARCHAR(50),
    is_default BOOLEAN
  );

  COPY styles(style_id, product_id, style_name, sale_price, original_price, is_default)
  FROM '/raw/styles.csv'
  DELIMITER ','
  CSV HEADER;

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