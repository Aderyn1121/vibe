
const express = require('express');
const { check, validationResult } = require('express-validator');
const { Playlist } = require('../db/models');
const { PlaylistSong } = require('../db/models');
const { User } = require('../db/models')
const { Song } = require('../db/models')
const { csrfProtection, asyncHandler } = require('../utils');

const router = express.Router();

const playlistValidators = 
    check('playlistName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an entry for playlist name')
        .isLength({ max: 20 })
        .withMessage('Playlist name cannot be more than 20 characters long.')





//Get route for playlists
router.get('/', asyncHandler(async (req, res) => {
    const playlists = await Playlist.findAll();
    playlists.forEach(playlist => {
        res.json({playListName: playlist.playlistName, playListId: playlist.id, userId: playlist.userId});
    });
}));


//Get route for playlist by id
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const playlistId = parseInt(req.params.id, 10);
    const playlist = await Playlist.findByPk(playlistId);
    res.json({playlistName: playlist.playlistName})
}))


//Get route for playlist songs
router.get('/:id/songs', asyncHandler(async( req, res) => {
    const playlistId = parseInt(req.params.id, 10);
    const playlistSongs = await PlaylistSong.findAll({
        where:{
            playlistId: playlistId
        }
    });
    playlistSongs.forEach(song => {
        res.json({ playlistSong: song.song, songId: song.id, playlistId: song.playlistId })
    }) 
    res.json({playlistSongs});
}));

//Get route for playlist song by id
router.get('/:id/songs/:id(\\d+)', asyncHandler( async( req, res) => {
    const songId = parseInt(req.params.id);
    const song = await Song.findByPk(songId);
    res.json({songName: song.songName, songId: songId})
}))




//TODO: work on the below code..

// router.post('users/:userId(\\d+)/playlist/add', csrfProtection, playlistValidators, asyncHandler(async (req, res) => {
//     const userId = parseInt(req.params.id, 10);
//     const user = await User.findByPk(userId);
//     const { playlistName } = req.body

//     const playlist = await User.build({
//         playlistName,
//         userId
//     });
    

//     const validateErrors = validationResult(req);
//     if(validateErrors.isEmpty()){
//         await playlist.save();
//         res.redirect(`/users/${userId}/playlists`);
//     } else {
//         const errors = validateErrors.array().map((error) => error.msg);
//         res.json({playlist})
//     }
// }))

module.exports = router;