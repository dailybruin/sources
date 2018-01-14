import * as Sequelize from 'sequelize';
import { sequelize } from './index';

export interface UserAttributes {
  name: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes> {
  name: string;

  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const User: Sequelize.Model<UserInstance, UserAttributes> = sequelize.define(
  'User',
  {
    name: Sequelize.STRING,

    // Google IDs are long af (like too long for INTs), so we need to use STRINGs
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
  }
);

sequelize.sync();

export default User;
