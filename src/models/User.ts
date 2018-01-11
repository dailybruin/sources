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
  }
);

sequelize.sync();

export default User;
