import { hashPassword } from '../service/auth.service';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: { type: DataTypes.STRING, set(val) { this.setDataValue('password', hashPassword(val)); }},
  }, { });
  User.associate = function(models) {};
  return User;
};