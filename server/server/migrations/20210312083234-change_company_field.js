'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'items',
        'company'
      ),
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
      )
    ]);
  }
};
