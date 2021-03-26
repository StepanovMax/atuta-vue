'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'items',
        'metaTitle',
        {
          type: Sequelize.STRING,
        }
      )
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'items',
        'metaTitle',
      )
    ]);
  }
};
