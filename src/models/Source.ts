import * as Sequelize from 'sequelize';
import { sequelize } from './index';

const Source = sequelize.define('Source', {
  name: Sequelize.STRING,
  organization: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: Sequelize.STRING,
  notes: Sequelize.STRING,
});

export default Source;
