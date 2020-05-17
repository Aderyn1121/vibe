'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert('Users', [
      { 
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()), 
        nickName: 'John Doe', birthday: new Date('01-01-2020'), 
        createdAt: new Date(), 
        updatedAt: new Date () 
      },
    ], { returning: true });

    return queryInterface.bulkInsert('Playlists', [
      { 
        playlistName: 'My Jamz', 
        userId: users[0].id, 
        createdAt: new Date(), 
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Playlists', null, {});
    return queryInterface.bulkDelete('Users', null, {});
  }
};
