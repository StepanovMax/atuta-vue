'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'favorites',
      {
        type: Sequelize.ARRAY(Sequelize.DECIMAL),
        allowNull: true,
        unique: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    )
  },
  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('users', 'favorites')
    ]);
  }
};
