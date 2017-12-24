import * as dotenv from 'dotenv';
import { createConnection, getManager, getRepository } from 'typeorm';
import { Source } from './Source';

dotenv.config();

console.log(process.env.DATABASE_HOST);

createConnection({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'sources',
  entities: [Source],
  synchronize: false,
  logging: true,
});
