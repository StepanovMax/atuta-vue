'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'items',
        'tarifExpiredDate',
        {
          defaultValue: 0,
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
      ),
      queryInterface.addColumn(
        'items',
        'rejectionReason',
        {
          type: Sequelize.STRING,
          allowNull: true,
          unique: false,
        },
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'items',
        'tarifExpiredDate'
      ),
      queryInterface.removeColumn(
        'items',
        'rejectionReason'
      ),
    ]);
  }
};