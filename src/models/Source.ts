import { Table, Column, Model } from 'sequelize-typescript';

@Table
class Source extends Model<Source> {
  @Column name: string;
  @Column org: string;
  @Column phone: string;
  @Column email: string;
  @Column notes: string;
}

// export default function defineSource(sequelize: Sequelize.Sequelize) {
//   const Source = sequelize.define('Source', {
//     name: Sequelize.STRING,
//     org: Sequelize.STRING,
//     phone: Sequelize.STRING,
//     email: Sequelize.STRING,
//     notes: Sequelize.STRING,
//   });

//   return Source;
// }
