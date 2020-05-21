const express = require('express');
const { check } = require('express-validator');
const { Playlist } = require('../db/models');
const { PlaylistSong } = require('../db/models');
const { Song } = require('../db/models');
const { Artist } = require('../db/models');
const { Album } = require('../db/models');
const { requireAuth } = require('../auth');
const {  asyncHandler, handleValidationErrors } = require('../utils');

const router = express.Router();
// this route will only work with a loggen in user once line 13 is enabled
// router.use(requireAuth);

const playlistNotFound = (id) => {
  const err = new Error(`Playlist with id of ${id} was not found`);
  err.status = 404;
  err.title = 'Playlist not found';
  return err;
};

const playlistValidators = check('playlistName')
  .exists({ checkFalsy: true })
  .withMessage('Please provide an entry for playlist name')
  .isLength({ max: 20 })
  .withMessage('Playlist name cannot be more than 20 characters long.');



//Get route for playlists--------------------------------------
router.post('/:id/playlists/add-playlist', playlistValidators, handleValidationErrors, asyncHandler( async( req, res) => {
    const userId = parseInt(req.params.id, 10);
    console.log(userId)
    const { playlistName } = req.body;
    console.log(playlistName)
    const playlist = await Playlist.create({playlistName, userId });
    res.status(201).json({playlistId: playlist.id, playlist: playlist.playlistName });
}))

//Get route for playlists
router.get(
  '/playlists',
  asyncHandler(async (req, res) => {
    const playlists = await Playlist.findAll();
    const userPlaylist = playlists.map((playlist) => {
      return {
        playListName: playlist.playlistName,
        playListId: playlist.id,
        userId: playlist.userId,
      };
    });
    res.json({ userPlaylist });
  })
);

//Get route for playlist by id
router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const playlistId = parseInt(req.params.id, 10);
    const playlist = await Playlist.findByPk(playlistId);
    if (playlist) {
      res.json({ playlistName: playlist.playlistName });
    } else {
      next(playlistNotFound(playlistId));
    }
  })
);

//Get route for playlist songs
router.get(
  '/:id/songs',
  asyncHandler(async (req, res) => {
    const playlistId = parseInt(req.params.id, 10);

    const playlistSongs = await PlaylistSong.findAll({
      where: {
        playlistId,
      },

      include: [
        {
          model: Song,
          include: [
            {
              model: Album,
              include: [
                  {
                    model: Artist 
                  }
              ]
            }
          ]
      },
    
    ]
    });

    const songsList = playlistSongs.map(playlistSong => {
      return { 
        playlistId: playlistSong.playlistId, 
        playlistSong: playlistSong.song, 
        songId: playlistSong.songId, 
        albumName: playlistSong.Song.Album.albumName, 
        albumId: playlistSong.Song.Album.id,
        artistName: playlistSong.Song.Album.Artist.artistName,
        artistId: playlistSong.Song.Album.Artist.id
      }
    })

    res.json({ songsList });
  })
);

//Get route for playlist song by id
router.get(
  '/:id/songs/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const songId = parseInt(req.params.id);
    const song = await Song.findByPk(songId);
    res.json({ songName: song.songName, songId: songId });
  })
);

module.exports = router;
