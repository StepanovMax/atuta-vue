'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserTEST = sequelize.define('UserTEST', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  UserTEST.associate = function(models) {
    // associations can be defined here
  };
  return UserTEST;
};