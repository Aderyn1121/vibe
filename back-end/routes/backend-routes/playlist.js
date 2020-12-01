const express = require('express');
const { check } = require('express-validator');
const { Playlist } = require('../../db/models');
const { PlaylistSong } = require('../../db/models');
const { Song } = require('../../db/models');
const { Artist } = require('../../db/models');
const { Album } = require('../../db/models');
const { requireAuth } = require('../../auth');
const {
  asyncHandler,
  handleValidationErrors,
  regExMaker,
} = require('../../utils');

const router = express.Router();
// this route will only work with a loggen in user once line 13 is enabled
router.use(requireAuth);

const playlistValidators = check('playlistName')
  .exists({ checkFalsy: true })
  .withMessage('Please provide an entry for playlist name')
  .isLength({ max: 20 })
  .withMessage('Playlist name cannot be more than 20 characters long.');

//Delete playlists
router.delete(
  '/:id/delete',
  asyncHandler(async (req, res) => {
    const playlistId = parseInt(req.params.id);
    const playlist = await Playlist.findByPk(playlistId);
    playlist.destroy();
    res.status(204).end();
  })
);

//edit playlists
router.put(
  '/:id/edit',
  playlistValidators,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const playlistId = parseInt(req.params.id);
    const playlist = await Playlist.findByPk(playlistId);
    const { playlistName } = req.body;
    await playlist.update({ playlistName });
    res.json({ message: 'The playlist name was updated' });
  })
);

//Get route for playlists--------------------------------------
router.get(
  '/',
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
  '/:id',
  asyncHandler(async (req, res) => {
    const playlistId = parseInt(req.params.id, 10);
    const playlist = await Playlist.findByPk(playlistId);
    res.json({ playlistName: playlist.playlistName });
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
                  model: Artist,
                },
              ],
            },
          ],
        },
      ],
    });

    const songsList = playlistSongs.map((playlistSong) => {
      return {
        playlistId: playlistSong.playlistId,
        songName: playlistSong.song,
        songId: playlistSong.songId,
        albumName: playlistSong.Song.Album.albumName,
        albumId: playlistSong.Song.Album.id,
        artistName: playlistSong.Song.Album.Artist.artistName,
        artistId: playlistSong.Song.Album.Artist.id,
      };
    });

    res.json({ songsList });
  })
);

//Get song by id
router.get(
  '/:id1/songs/:id2',
  asyncHandler(async (req, res) => {
    const playlistSongsId = parseInt(req.params.id1);
    const songId = parseInt(req.params.id2);
    const playlistSongs = await PlaylistSong.findAll({
      where: { playlistId: playlistSongsId },
      include: [
        {
          model: Song,
          where: { id: songId },
        },
      ],
    });
    const songs = playlistSongs.map((song) => {
      return {
        songName: song.song,
        songId: song.songId,
      };
    });
    res.json({ songs });
  })
);

//Add songs
router.post(
  '/:id1/songs',
  asyncHandler(async (req, res) => {
    const playlistId = parseInt(req.params.id1, 10);
    const { songId } = req.body;
    const id = Number(songId);
    const song = await Song.findByPk(id);
    PlaylistSong.create({ song: song.songName, songId: song.id, playlistId });
    res.json({ message: 'song was added to playlist songs' });
  })
);

//Delete playlist song
router.delete(
  '/:id1/songs/:id2',
  asyncHandler(async (req, res) => {
    const playlistSongsId = parseInt(req.params.id1, 10);
    const songId = parseInt(req.params.id2, 10);
    const playlistSongs = await PlaylistSong.findAll({
      where: { playlistId: playlistSongsId },
    });
    playlistSongs.map((song) => {
      if (song.songId === songId) {
        song.destroy();
      }
    });
    res.json({ message: 'song was deleted' });
  })
);

module.exports = router;
