'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'newUsers',
      'phone',
      Sequelize.BIGINT
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'newUsers',
      'phone',
      Sequelize.INTEGER
    );
  }
};