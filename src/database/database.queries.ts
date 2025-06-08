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

export const T_Queries = {
  createTable: `
  CREATE TABLE IF NOT EXISTS trains (
    id SERIAL PRIMARY KEY,
    number VARCHAR(4) NOT NULL UNIQUE
  );
  `,
  insertTrain: `
  INSERT INTO trains (number) VALUES ($1) RETURNING *;
  `,
  getTrainByNumber: `
    SELECT * FROM trains WHERE number = $1;
  `,
};

export const C_Queries = {
  createTable: `
  CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    train_id INTEGER REFERENCES trains(id) ON DELETE CASCADE,
    number VARCHAR(3) NOT NULL,
    UNIQUE (train_id, number)
  );
  `,
  insertCar: `
  INSERT INTO cars (train_id, number) VALUES 
  `,
  getCar: `
  SELECT number FROM cars WHERE train_id = $1;
  `,
  deleteCarByNumber: `
  DELETE FROM cars 
  WHERE train_id = $1 AND number = ANY($2::text[]);
`,
  removeConflict: `
   ON CONFLICT (train_id, number) DO NOTHING
   `,
};
