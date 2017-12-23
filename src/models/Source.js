module.exports = (sequelize, DataTypes) => {
  const Source = sequelize.define('Source', {
    name: DataTypes.STRING,
    org: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    notes: DataTypes.STRING,
  });

  return Source;
};
