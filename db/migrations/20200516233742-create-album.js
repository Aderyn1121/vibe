'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Albums', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      albumName: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      releaseDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      artistId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Artists'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Albums');
  }
};
