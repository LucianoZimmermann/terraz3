SET search_path TO public;

CREATE TABLE IF NOT EXISTS tract_owners (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS tracts (
    id SERIAL PRIMARY KEY,
    square_meters NUMERIC NOT NULL,
    tract_owner_id INT REFERENCES tract_owners(id),
    street VARCHAR(255),
    number VARCHAR(255),
    city VARCHAR(255),
    neighborhood VARCHAR(255),
    state VARCHAR(255),
    cep VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS quotes (
    id SERIAL PRIMARY KEY,
    tract_id INT REFERENCES tracts(id) ON DELETE SET NULL,
    total_factors_price NUMERIC NOT NULL,
    lot_count NUMERIC,
    tract_owner_lot_count NUMERIC,
    price_per_lot NUMERIC,
    total_profit NUMERIC,
    total_liquid_profit NUMERIC,
    markup NUMERIC,
    create_date TIMESTAMP NOT NULL,
    CONSTRAINT quotes_lot_count_nonneg CHECK (lot_count IS NULL OR lot_count >= 0),
    CONSTRAINT quotes_tract_owner_lot_count_nonneg CHECK (tract_owner_lot_count IS NULL OR tract_owner_lot_count >= 0),
    CONSTRAINT quotes_tract_owner_lot_count_le_lot_count CHECK (
        lot_count IS NULL
        OR tract_owner_lot_count IS NULL
        OR tract_owner_lot_count <= lot_count
    )
);

CREATE TABLE IF NOT EXISTS third_parties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20) UNIQUE NOT NULL,
    contact_name VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS factors (
    id SERIAL PRIMARY KEY,
    quote_id INT NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    third_party_id INT REFERENCES third_parties(id),
    price NUMERIC NOT NULL
);

CREATE TABLE  IF NOT EXISTS users (
  id           SERIAL PRIMARY KEY,
  email        VARCHAR(255) UNIQUE NOT NULL,
  name         VARCHAR(255),
  role         VARCHAR(50) NOT NULL,
  enabled      BOOLEAN NOT NULL DEFAULT TRUE
);
