import { createConnection } from 'typeorm';

async function initializeDatabase() {
  // Configure connection to database.
  const databaseName =
    process.env.NODE_ENV === 'test' ? 'sources-test' : 'sources';

  const connection = await createConnection({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: databaseName,
  });
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export { sequelize };
export { default as Source } from './Source';
export { default as User } from './User';
