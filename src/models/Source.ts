// I'd like to use the line
// import { Model, Instance, STRING } from 'sequelize';
// but apparently this doesn't work :(. See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16588.
import * as Sequelize from 'sequelize';
import { sequelize } from './index';

/**
 *
 *
 * @export
 * @interface SourceAttributes
 */
export interface SourceAttributes {
  name?: string;
  organization?: string;
  phones?: string;
  emails?: string;
  notes?: string;
}

export interface SourceInstance extends Sequelize.Instance<SourceAttributes> {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

const Source: Sequelize.Model<
  SourceInstance,
  SourceAttributes
> = sequelize.define('Source', {
  name: Sequelize.STRING,
  organization: Sequelize.STRING,
  phones: Sequelize.STRING,
  emails: Sequelize.STRING,
  notes: Sequelize.STRING,
});

export default Source;
