import * as Sequelize from 'sequelize';
import { sequelize } from './index';

export interface UserAttributes {
  name: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes> {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

const User: Sequelize.Model<UserInstance, UserAttributes> = sequelize.define(
  'User',
  {
    name: Sequelize.STRING,

    // Google IDs are long af, so we need a longer type than INT
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
  }
);

sequelize.sync();

export default User;
