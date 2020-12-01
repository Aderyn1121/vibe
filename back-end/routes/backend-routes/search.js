const express = require('express');

const { Artist } = require('../../db/models');
const { User } = require('../../db/models');
const { Song } = require('../../db/models');
const { UserFriend } = require('../../db/models');
const { Playlist } = require('../../db/models');
const { Album } = require('../../db/models');

const {
  asyncHandler,
  handleValidationErrors,
  regExMaker,
} = require('../../utils');

const router = express.Router();

//NOTES: This file is just to have active calls querying from the database. once everyhthing is working and displaying as needed I will add the requireAuth
// To test when a user is logged in

//search route for finding all Artists, songs, and albums
router.get(
  '/',
  asyncHandler(async (req, res) => {
    let { searchInput, userId } = req.query;
    searchInput = searchInput.toLowerCase();

    let matchedSongs = [];
    let matchedFriends = [];
    let matchedUsers = [];
    let matchedArtist = [];
    let matchedAlbums = [];
    let matchedPlaylists = [];

    const searchResults = {
      matchedSongs,
      matchedFriends,
      matchedUsers,
      matchedArtist,
      matchedAlbums,
      matchedPlaylists,
    };

    //Artists
    const artists = await Artist.findAll();
    artists.map((artist) => {
      let find = artist.artistName;
      find = find.toLowerCase();
      if (regExMaker(find, searchInput) !== null) {
        matchedArtist.push({ name: artist.artistName, id: artist.id });
      }
    });

    //Songs
    const songs = await Song.findAll();
    songs.map((song) => {
      let find = song.songName;
      find = find.toLowerCase();
      if (regExMaker(find, searchInput) !== null) {
        matchedSongs.push({ name: song.songName, id: song.id });
      }
    });

    //Albums
    const albums = await Album.findAll();
    albums.map((album) => {
      let find = album.albumName;
      find = find.toLowerCase();
      if (regExMaker(find, searchInput) !== null) {
        matchedAlbums.push({ name: album.albumName, id: album.id });
      }
    });

    //Playlists
    const playlists = await Playlist.findAll();
    playlists.map((playlist) => {
      let find = playlist.playlistName;
      find = find.toLowerCase();
      if (regExMaker(find, searchInput) !== null) {
        matchedPlaylists.push({
          name: playlist.playlistName,
          id: playlist.id,
        });
      }
    });

    //Friends
    if (userId) {
      const userFriends = await UserFriend.findAll({
        where: { userId: userId },
      });
      userFriends.map((friend) => {
        let find = userFriends.friend;
        find = find.toLowerCase();
        if (regExMaker(find, searchInput) !== null) {
          matchedFriends.push({ name: friend.friend, id: friend.friendId });
        }
      });
    }

    //Users
    const users = await User.findAll();
    users.map((user) => {
      let find = user.userName;
      find = find.toLowerCase();
      if (regExMaker(find, searchInput) !== null) {
        matchedUsers.push({ name: user.userName, id: user.id });
      }
    });

    await res.send({ searchResults });
  })
);

//search route for finding all users

//search route for finding all user friends
router.get(
  '/:id/friends',
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id);
    const friendsList = await UserFriend.findAll({ where: { userId } });
    const friends = friendsList.map((friend) => {
      return { friendName: friend.friendName, friendId: friend.friendId };
    });

    res.json({ friends });
  })
);

//search route for finding all users
router.get(
  '/:id/users',
  asyncHandler(async (req, res) => {
    const usersList = await User.findAll();
    const users = usersList.map((user) => {
      return { userId: user.id, userName: user.userName };
    });

    res.json({ users });
  })
);

//search route for finding all playlists
router.get(
  '/playlists',
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id);
    const playlistsList = await Playlist.findAll({ where: { userId } });
    const playlists = playlistsList.map((playlist) => {
      return { playlistId: playlist.id, playlistName: playlist.playlistName };
    });

    res.json({ playlists });
  })
);

module.exports = router;
