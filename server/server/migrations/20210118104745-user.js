'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'users', // table name
        'accessToken', // new field name
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      ),
      queryInterface.changeColumn(
        'users',
        'refreshToken',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.changeColumn(
        'users', // table name
        'accessToken', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.changeColumn(
        'users',
        'refreshToken',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ]);
  }
};
