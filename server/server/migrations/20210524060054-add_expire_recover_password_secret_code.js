'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'expireRecoverSecretCode',
        {
          defaultValue: '',
          type: Sequelize.TEXT,
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
        'expireRecoverSecretCode'
      ),
    ]);
  }
};