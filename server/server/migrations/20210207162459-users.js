'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'users',
        'login',
        {
          allowNull: true,
          unique: true,
        },
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'login',
        {
          allowNull: true,
          unique: true,
        },
      ),
    ]);
  }
};
