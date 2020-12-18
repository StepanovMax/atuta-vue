'use strict';
module.exports = (sequelize, Sequelize) => {
  const newUser = sequelize.define('newUser', {
    role: Sequelize.STRING,
    login: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.BIGINT,
    logo: Sequelize.STRING,
    website: Sequelize.STRING,
    address: Sequelize.STRING,
    description: Sequelize.STRING
  }, {});
  newUser.associate = function(models) {
    // associations can be defined here
  };
  return newUser;
};