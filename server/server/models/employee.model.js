'use strict';
module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define('employee', {
    name: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your name'
      }
    },
    phone: {
      type: Sequelize.BIGINT,
      unique: {
        args: true,
        msg: 'Phone already exists'
      },
      allowNull: {
        args: false,
        msg: 'Please enter your phone'
      }
    },
  }, {});

  return Employee;
};