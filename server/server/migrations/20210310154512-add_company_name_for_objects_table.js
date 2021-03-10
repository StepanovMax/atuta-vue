'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'items',
        'companyName',
        {
          type: Sequelize.STRING,
        },
      ),
    ]);
  },
  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn(
        'items',
        'companyName'
      ),
    ]);
  }
};
