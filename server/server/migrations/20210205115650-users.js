'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'users',
        'logo',
        {
          allowNull: true,
          unique: true,
        },
      ),
      queryInterface.changeColumn(
        'users',
        'website',
        {
          allowNull: true,
          unique: true,
        },
      ),
      queryInterface.changeColumn(
        'users',
        'address',
        {
          allowNull: true,
          unique: true,
        },
      ),
      queryInterface.changeColumn(
        'users',
        'description',
        {
          allowNull: true,
          unique: true,
        },
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'users',
        'logo',
        {
          allowNull: false,
          unique: false,
        },
      ),
      queryInterface.changeColumn(
        'users',
        'website',
        {
          allowNull: false,
          unique: false,
        },
      ),
      queryInterface.changeColumn(
        'users',
        'address',
        {
          allowNull: false,
          unique: false,
        },
      ),
      queryInterface.changeColumn(
        'users',
        'description',
        {
          allowNull: false,
          unique: false,
        },
      ),
    ]);
  }
};
