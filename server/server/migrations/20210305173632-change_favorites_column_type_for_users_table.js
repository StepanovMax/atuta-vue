'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'users',
        'favorites',
        {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
        },
      ),
    ]);
  },
  down: queryInterface => {
    return Promise.all([
      queryInterface.changeColumn(
        'users',
        'favorites',
        {
          type: Sequelize.ARRAY(Sequelize.DECIMAL),
        },
      ),
    ]);
  }
};
