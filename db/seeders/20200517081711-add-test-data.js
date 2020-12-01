'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'john@doe.com',
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          userName: 'John Doe',
          birthday: new Date('01-01-2020'),
          gender: 'male',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'jane@doe.com',
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          userName: 'Jane Doe',
          birthday: new Date('01-01-2020'),
          gender: 'female',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'vibe4@user.com',
          hashedPassword: bcrypt.hashSync('Test@1234'),
          userName: 'Demo User',
          birthday: new Date('01-01-2020'),
          gender: 'non-binary',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    const friends = await queryInterface.bulkInsert(
      'UserFriends',
      [
        {
          userName: users[0].userName,
          friendName: users[1].userName,
          userId: users[0].id,
          friendId: users[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    const playlists = await queryInterface.bulkInsert(
      'Playlists',
      [
        {
          playlistName: 'My Jamz',
          userId: users[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playlistName: 'Weekend Vibes',
          userId: users[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playlistName: 'Chillin',
          userId: users[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playlistName: 'My First Playlist',
          userId: users[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    const artists = await queryInterface.bulkInsert(
      'Artists',
      [
        {
          artistName: 'Queen',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          artistName: 'The Weeknd',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          artistName: 'Imogen Heap',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          artistName: 'Type (A) Alert',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          artistName: 'Groove for Thought',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          artistName: 'Adele',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          artistName: 'The Rolling Stones',
          createdAt: new Date(),
          updatedAt: new Date(),
        }, /*6*/
        {
          artistName: 'Natasha Tyrimos',
          createdAt: new Date(),
          updatedAt: new Date(),
        }, /*7*/
        {
          artistName: 'Pentatonix',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          artistName: 'Darude',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          artistName: 'Vertical Voices',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          artistName: 'Zedd, Elley Duhé & Arkadi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    const albums = await queryInterface.bulkInsert(
      'Albums',
      [
        {
          albumName: 'Jazz',
          releaseDate: new Date('01-05-1979'),
          artistId: artists[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumName: 'The Weeknd XO',
          releaseDate: new Date('03-19-2020'),
          artistId: artists[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumName: 'Speak for Yourself',
          releaseDate: new Date('07-18-2005'),
          artistId: artists[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumName: 'Seasons- Single',
          releaseDate: new Date('07-18-2005'),
          artistId: artists[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumName: 'Unnecessary Dissonance',
          releaseDate: new Date('12-1-2014'),
          artistId: artists[4].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumName: '25',
          releaseDate: new Date('12-1-2014'),
          artistId: artists[5].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumName: 'Hot Rocks 1964-1971',
          releaseDate: new Date('12-20-1971'),
          artistId: artists[6].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, /*6*/
        {
          albumName: 'Singer Songwriter Sensual',
          releaseDate: new Date('09-14-2017'),
          artistId: artists[7].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, /*7*/
        {
          albumName: 'The Sing Off: Season 3, Episode 9 - R&B',
          releaseDate: new Date('11-14-2011'),
          artistId: artists[8].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumName: 'Before The Storm',
          releaseDate: new Date('09-18-2000'),
          artistId: artists[9].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumName: 'Fourward',
          releaseDate: new Date('01-02-2014'),
          artistId: artists[10].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumName: 'Happy Now (Acoustic) - Single',
          releaseDate: new Date('07-18-2018'),
          artistId: artists[11].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    const songs = await queryInterface.bulkInsert(
      'Songs',
      [
        {
          songName: "Don't stop me now",
          releaseDate: albums[0].releaseDate,
          albumId: albums[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songName: 'Escape From LA',
          releaseDate: albums[1].releaseDate,
          albumId: albums[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songName: 'Hide and Seek',
          releaseDate: albums[2].releaseDate,
          albumId: albums[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songName: 'Seasons',
          releaseDate: albums[3].releaseDate,
          albumId: albums[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songName: 'Teach Me Tonight',
          releaseDate: albums[4].releaseDate,
          albumId: albums[4].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songName: 'Hello',
          releaseDate: albums[5].releaseDate,
          albumId: albums[5].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*6*/
        },
        {
          songName: 'Send My Love (To Your New Lover)',
          releaseDate: albums[5].releaseDate,
          albumId: albums[5].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*7*/
        },
        {
          songName: 'I Miss You',
          releaseDate: albums[5].releaseDate,
          albumId: albums[5].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*8*/
        },
        {
          songName: 'When We Were Young',
          releaseDate: albums[5].releaseDate,
          albumId: albums[5].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*9*/
        },
        {
          songName: 'Remedy',
          releaseDate: albums[5].releaseDate,
          albumId: albums[5].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*10*/
        },
        {
          songName: 'Water Under The Bridge',
          releaseDate: albums[5].releaseDate,
          albumId: albums[5].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*11*/
        },
        {
          songName: 'River Lea',
          releaseDate: albums[5].releaseDate,
          albumId: albums[5].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*12*/
        },
        {
          songName: 'Love in the Dark',
          releaseDate: albums[5].releaseDate,
          albumId: albums[5].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*13*/
        },
        {
          songName: 'Million Years Ago',
          releaseDate: albums[5].releaseDate,
          albumId: albums[5].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*14*/
        },
        {
          songName: 'All I Ask',
          releaseDate: albums[5].releaseDate,
          albumId: albums[5].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*15*/
        },
        {
          songName: 'Sweetest Devotion',
          releaseDate: albums[5].releaseDate,
          albumId: albums[5].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*16*/
        },
        {
          songName: '(I Can\'t Get No) Satisfaction',
          releaseDate: albums[6].releaseDate,
          albumId: albums[6].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*17*/
        },
        {
          songName: 'Happy',
          releaseDate: albums[7].releaseDate,
          albumId: albums[7].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*18*/
        },
        {
          songName: "Let's Get it On",
          releaseDate: albums[8].releaseDate,
          albumId: albums[8].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*19*/
        },
        {
          songName: "Sandstorm",
          releaseDate: albums[9].releaseDate,
          albumId: albums[9].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*20*/
        },
        {
          songName: "My Favorite Things",
          releaseDate: albums[4].releaseDate,
          albumId: albums[4].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*21*/
        },
        {
          songName: "Strangers Of The Heart",
          releaseDate: albums[4].releaseDate,
          albumId: albums[4].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*22*/
        },
        {
          songName: "Harold's House of Jazz",
          releaseDate: albums[4].releaseDate,
          albumId: albums[4].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*23*/
        },
        {
          songName: "Drive",
          releaseDate: albums[4].releaseDate,
          albumId: albums[4].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*24*/
        },
        {
          songName: "Timeline",
          releaseDate: albums[10].releaseDate,
          albumId: albums[10].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*25*/
        },
        {
          songName: "First Train Home",
          releaseDate: albums[10].releaseDate,
          albumId: albums[10].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*26*/
        },
        {
          songName: "The Cry and the Smile",
          releaseDate: albums[10].releaseDate,
          albumId: albums[10].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*27*/
        },
        {
          songName: "Emily",
          releaseDate: albums[10].releaseDate,
          albumId: albums[10].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*28*/
        },
        {
          songName: "New Day",
          releaseDate: albums[10].releaseDate,
          albumId: albums[10].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*29*/
        },
        {
          songName: "Hand in Hand",
          releaseDate: albums[10].releaseDate,
          albumId: albums[10].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*30*/
        },
        {
          songName: "Dandaya",
          releaseDate: albums[10].releaseDate,
          albumId: albums[10].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*31*/
        },
        {
          songName: "Travel On By",
          releaseDate: albums[10].releaseDate,
          albumId: albums[10].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*32*/
        },
        {
          songName: "Lee's Summit",
          releaseDate: albums[10].releaseDate,
          albumId: albums[10].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*33*/
        },
        {
          songName: "Happy Now (Acoustic)",
          releaseDate: albums[11].releaseDate,
          albumId: albums[11].id,
          createdAt: new Date(),
          updatedAt: new Date(), /*34*/
        },

      ],
      { returning: true }
    );

    return queryInterface.bulkInsert(
      'PlaylistSongs',
      [
        {
          song: songs[2].songName,
          playlistId: playlists[3].id,
          songId: songs[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          song: songs[3].songName,
          playlistId: playlists[3].id,
          songId: songs[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          song: songs[4].songName,
          playlistId: playlists[3].id,
          songId: songs[4].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          song: songs[3].songName,
          playlistId: playlists[0].id,
          songId: songs[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          song: songs[4].songName,
          playlistId: playlists[1].id,
          songId: songs[4].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          song: songs[2].songName,
          playlistId: playlists[1].id,
          songId: songs[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PlaylistSongs', null, {});
    await queryInterface.bulkDelete('Songs', null, {});
    await queryInterface.bulkDelete('Albums', null, {});
    await queryInterface.bulkDelete('Artists', null, {});
    await queryInterface.bulkDelete('Playlists', null, {});
    await queryInterface.bulkDelete('UserFriends', null, {});
    return queryInterface.bulkDelete('Users', null, {});
  },
};
