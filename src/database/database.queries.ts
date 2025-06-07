export const S_Queries = {
  createTable: `
    CREATE TABLE IF NOT EXISTS stations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      code VARCHAR(7) NOT NULL UNIQUE CHECK (code ~ '^22[0-9]{5}$')
    );
    `,
  insertStation: `
    INSERT INTO stations (name, code)
    VALUES ($1, $2)
    RETURNING *;
    `,
  getStationByCode: `
    SELECT * FROM stations WHERE code = $1;
    `,
  getAllStations: `
    SELECT * FROM stations;
    `,
};
