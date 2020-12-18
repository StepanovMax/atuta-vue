'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'newUsers',
        'description',
        Sequelize.TEXT
      ),
      queryInterface.removeColumn(
        'newUsers',
        'desctipion',
        Sequelize.TEXT
      ),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'newUsers',
        'desctipion',
        Sequelize.TEXT
      ),
      queryInterface.removeColumn(
        'newUsers',
        'description',
        Sequelize.TEXT
      ),
    ]);
  }
};