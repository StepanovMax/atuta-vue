'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'moneyBalance',
        {
          defaultValue: 0,
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'users',
        'moneyBalance'
      ),
    ]);
  }
};