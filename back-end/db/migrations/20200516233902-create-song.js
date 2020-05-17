'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      songName: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      releaseDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      albumId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Albums'}
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
    return queryInterface.dropTable('Songs');
  }
};