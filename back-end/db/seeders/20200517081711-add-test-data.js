'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert('Users', [
      { 
        email: 'john@doe.com',
        hashedPassword: bcrypt.hashSync(faker.internet.password()), 
        nickName: 'John Doe', birthday: new Date('01-01-2020'), 
        createdAt: new Date(), 
        updatedAt: new Date () 
      },
      { 
        email: 'jane@doe.com',
        hashedPassword: bcrypt.hashSync(faker.internet.password()), 
        nickName: 'Jane Doe', birthday: new Date('01-01-2020'), 
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
      },
      { 
        playlistName: 'Weekend Vibes', 
        userId: users[0].id, 
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      { 
        playlistName: 'Chillin', 
        userId: users[1].id, 
        createdAt: new Date(), 
        updatedAt: new Date()
      },
    ], {returning: true });

    const artists = await queryInterface.bulkInsert('Artists', [
      {
        artistName: 'Queen', 
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        artistName: 'The Weeknd', 
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
      { 
        albumName: 'The Weeknd XO', 
        releaseDate: new Date('03-19-2020'), 
        artistId: artists[1].id, 
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
      },
      { 
        songName: "Escape From LA", 
        releaseDate: albums[0].releaseDate,
        albumId: albums[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], { returning: true });

    return queryInterface.bulkInsert('PlaylistSongs', [
      {
        song: songs[0].songName,
        playlistId: playlists[0].id,
        songId: songs[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        song: songs[1].songName,
        playlistId: playlists[0].id,
        songId: songs[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        song: songs[1].songName,
        playlistId: playlists[1].id,
        songId: songs[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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