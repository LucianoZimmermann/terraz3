SET search_path TO public;

DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'feasibility_enum') THEN
            CREATE TYPE feasibility_enum AS ENUM (
                'IMPOSSIBLE','LOW_PROFITABILITY','MODERATE','PROFITABLE','VERY_PROFITABLE'
                );
        END IF;
    END
$$;

CREATE TABLE neighborhoods (
                               id SERIAL PRIMARY KEY,
                               name VARCHAR(255) UNIQUE NOT NULL,
                               price_factor NUMERIC(10,4) NOT NULL DEFAULT 1.0000,
                               CONSTRAINT neighborhoods_price_factor_nonneg CHECK (price_factor >= 0)
);

CREATE TABLE addresses (
                           id SERIAL PRIMARY KEY,
                           street VARCHAR(255),
                           number VARCHAR(255),
                           city VARCHAR(255),
                           state VARCHAR(255),
                           cep VARCHAR(20),
                           neighborhood_id INT NOT NULL REFERENCES neighborhoods(id)
);

CREATE TABLE tract_owners (
                              id SERIAL PRIMARY KEY,
                              name VARCHAR(255) NOT NULL,
                              cpf VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE tracts (
                        id SERIAL PRIMARY KEY,
                        square_meters NUMERIC NOT NULL,
                        address_id INT REFERENCES addresses(id) ON DELETE CASCADE,
                        tract_owner_id INT REFERENCES tract_owners(id)
);

CREATE TABLE quotes (
                        id SERIAL PRIMARY KEY,
                        tract_id INT REFERENCES tracts(id) ON DELETE SET NULL,
                        total_factors_price NUMERIC NOT NULL,
                        lot_count NUMERIC,
                        price_per_lot NUMERIC,
                        feasibility feasibility_enum,
                        create_date TIMESTAMP NOT NULL
);

CREATE TABLE third_parties (
                               id SERIAL PRIMARY KEY,
                               name VARCHAR(255) NOT NULL,
                               cnpj VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE factors (
                         id SERIAL PRIMARY KEY,
                         quote_id INT NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
                         third_party_id INT REFERENCES third_parties(id),
                         material_cost NUMERIC NOT NULL,
                         labor_cost NUMERIC NOT NULL
);
