'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
    
    return queryInterface.bulkInsert('Songs', [
      { 
        songName: "Don't stop me now", 
        releaseDate: albums[0].releaseDate,
        albumId: albums[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  
  

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Songs', null, {});
    await queryInterface.bulkDelete('Albums', null, {});
    return queryInterface.bulkDelete('Artists', null, {});
  }
};
