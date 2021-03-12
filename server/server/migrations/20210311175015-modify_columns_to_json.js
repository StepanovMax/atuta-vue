'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'items',
        'companyName'
      ),
      queryInterface.removeColumn(
        'users',
        'role'
      )
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'items',
        'company',
        {
          type: Sequelize.JSON
        }
      ),
      queryInterface.addColumn(
        'users',
        'role',
        {
          type: Sequelize.JSON
        }
      )
    ]);
  }
};
