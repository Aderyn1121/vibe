const express = require('express');

const { Artist } = require('../db/models');
const { User } = require('../db/models');
const { Song } = require('../db/models');
const { UserFriend } = require('../db/models');
const { Playlist } = require('../db/models');
const { Album } = require('../db/models');

const { asyncHandler, handleValidationErrors, regExMaker } = require('../utils');

const router = express.Router();

//NOTES: This file is just to have active calls querying from the database. once everyhthing is working and displaying as needed I will add the requireAuth
// To test when a user is logged in
let matchedSongs = []
let matchedFriends = []
let matchedUsers = []
let matchedArtist = []
let matchedAlbums = []
let matchedPlaylists = []

const searchResults = {
    matchedSongs,
    matchedFriends,
    matchedUsers,
    matchedArtist,
    matchedAlbums
}


//search route for finding all Artists, songs, and albums
router.get('/', asyncHandler( async(req, res) => {
    let { searchInput } = req.body;
    searchInput = searchInput.toLowerCase();

    //Artists
    const artists = await Artist.findAll();
    artists.map( artist => {
        let check = artist.artistName
        check = check.toLowerCase()
        if(regExMaker(check, searchInput) !== null){
            matchedArtist.push(artist.artistName)
        }
    });

    //Songs
    const songs = await Song.findAll()
    songs.map( song => {
        let check = song.songName
        check = check.toLowerCase()
        if(regExMaker(check, searchInput) !== null){
            matchedSongs.push(song.songName)
        }
        
    });
    
    const albums = await Album.findAll()
    albums.map( album => {
        let check = album.albumName
        check = check.toLowerCase()
        if(regExMaker(check, searchInput) !== null){
            matchedAlbums.push(album.albumName)
        }
    });
    await res.json({searchResults})
}));

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

//search route for finding all playlists
router.get('/playlists', asyncHandler( async(req, res) => {
    const userId = parseInt(req.params.id);
    const playlistsList = await Playlist.findAll({ where: { userId }});
    const playlists = playlistsList.map( playlist => {
        return { playlistId: playlist.id, playlistName: playlist.playlistName }
    });

    res.json({ playlists });
}));


module.exports = router;
