import * as Sequelize from 'sequelize';

// Configure connection to database.
const databaseName =
  process.env.NODE_ENV === 'test' ? 'sources-test' : 'sources';

const sequelize = new Sequelize(
  databaseName,
  process.env.DATABASE_USER!,
  process.env.DATABASE_PASSWORD!,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    operatorsAliases: false,
  }
);

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
