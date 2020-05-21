const express = require('express');
const { PlaylistSong } = require('../db/models');
const { Song } = require('../db/models');
const { asyncHandler } = require('../utils');
const router = express.Router();


// const populatePlaylist = (song, memo = {}) => {
//     if(song in memo) return memo[song];
//     memo[song] = 
// }

router.get('/', asyncHandler( async(req, res) =>{
    const userId = parseInt(req.params.id, 10);
    const playlistSongs = await PlaylistSong.findAll({ where: { playlistId }});
    const playlistsArray = await Playlist.findAll({ where: { userId} });

    let song;
    playlistsArray.forEach( playlist => { //eg: my jams
        song = playlist.song
    })

    console.log(song)
}))