DROP TABLE IF EXISTS api_keys;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cereals;

CREATE TABLE cereals (
    id CHAR(26) PRIMARY KEY,
    name VARCHAR NOT NULL,
    mfr CHAR(1) NOT NULL,
    type CHAR(1) NOT NULL,
    calories INT NOT NULL,
    protein INT NOT NULL,
    fat INT NOT NULL,
    sodium INT NOT NULL,
    fiber FLOAT NOT NULL,
    carbo FLOAT NOT NULL,
    sugars INT NOT NULL,
    potass INT NOT NULL,
    vitamins INT NOT NULL,
    shelf INT NOT NULL,
    weight FLOAT NOT NULL,
    cups FLOAT NOT NULL,
    rating FLOAT NOT NULL
);

CREATE TABLE users (
    id CHAR(26) PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE api_keys (
    id CHAR(26) PRIMARY KEY,
    api_key varchar NOT NULL UNIQUE,
    user_id CHAR(26) NOT NULL,
    expires DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);
