'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'newUsers',
      'phone',
      Sequelize.INTEGER
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'newUsers',
      'phone',
      Sequelize.BIGINT
    );
  }
};