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

    const playlists = await queryInterface.bulkInsert('Playlists', [
      { 
        playlistName: 'My Jamz', 
        userId: users[0].id, 
        createdAt: new Date(), 
        updatedAt: new Date()
      }
    ], {returning: true });

    const artists = await queryInterface.bulkInsert('Artists', [
      {
        artistName: 'Queen', 
        createdAt: new Date(), 
        updatedAt: new Date()
      },
    ], {returning: true });
    
    const albums = await queryInterface.bulkInsert('Albums', [
      { 
        albumName: 'Jazz', 
        releaseDate: new Date('01-05-1979'), 
        artistId: artists[0].id, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
    ], {returning: true });
    
    const songs = await queryInterface.bulkInsert('Songs', [
      { 
        songName: "Don't stop me now", 
        releaseDate: albums[0].releaseDate,
        albumId: albums[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    return queryInterface.bulkInsert('PlaylistSongs', [
      {
        song: songs[0].songName,
        playlistId: playlists[0].id,
        songId: songs[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PlaylistSongs', null, {});
    await queryInterface.bulkDelete('Songs', null, {});
    await queryInterface.bulkDelete('Albums', null, {});
    await queryInterface.bulkDelete('Artists', null, {});
    await queryInterface.bulkDelete('Playlists', null, {});
    return queryInterface.bulkDelete('Users', null, {});
  }
};