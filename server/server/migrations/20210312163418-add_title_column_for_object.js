'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'items',
        'title',
        {
          type: Sequelize.STRING
        }
      )
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'items',
        'title'
      )
    ]);
  }
};
