const express = require('express');

const { Artist } = require('../db/models');
const { User } = require('../db/models');
const { Song } = require('../db/models');
const { UserFriend } = require('../db/models');
const { Playlist } = require('../db/models');
const { Album } = require('../db/models');

const { asyncHandler } = require('../utils');

const router = express.Router();

//NOTES: This file is just to have active calls querying from the database. once everyhthing is working and displaying as needed I will add the requireAuth
// To test when a user is logged in

//search route for finding all user friends
router.get('/:id/friends', asyncHandler( async(req, res) => {
    const userId = parseInt(req.params.id);
    const friendsList = await UserFriend.findAll({ where: { userId }});
    const friends = friendsList.map( friend => {
        return {friendName: friend.friendName, friendId: friend.friendId }
    })

    res.json({friends})
}));

//search route for finding all users
router.get('/:id/users', asyncHandler( async(req, res) => {
    const usersList = await User.findAll();
    const users = usersList.map(user => {
        return { userId: user.id , userName: user.userName }
    })

    res.json({ users });
}));

//get route for finding artists
router.get('/:id/artists', asyncHandler( async(req, res) => {
    const artistsList = await Artist.findAll();
    const artists = artistsList.map( artist => {
        return { artistId: artist.id, artistName: artist.artistName }
    });

    res.json({ artists });
}));

//   url/users/1/search/1/playlists

router.get('/:id/playlists', asyncHandler( async(req, res) => {
    const userId = parseInt(req.params.id);
    const playlistsList = await Playlist.findAll({ where: { userId }});
    const playlists = playlistsList.map( playlist => {
        return { playlistId: playlist.id, playlistName: playlist.playlistName }
    });

    res.json({ playlists });
}));

router.get('/:id/songs', asyncHandler( async(req, res) => {
    const songsList = await Song.findAll();
    const songs = songsList.map( song => {
        return { songId: song.id, songName: song.songName }
    });

    res.json({ songs });
}));

router.get('/:id/albums', asyncHandler( async(req, res) => {
    const albumList = await Album.findAll();
    const albums = albumList.map( album => {
        return { albumId: album.id, albumName: album.albumName }
    });

    res.json({ albums });
}));

module.exports = router;
