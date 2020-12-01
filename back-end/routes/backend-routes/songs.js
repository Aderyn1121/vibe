const express = require('express');
const { Song } = require('../../db/models');
const { Artist } = require('../../db/models');
const { Album } = require('../../db/models');
const { asyncHandler } = require('../../utils');
const { requireAuth } = require('../../auth')
const router = express.Router();


router.get('/:id', requireAuth, asyncHandler(async (req, res) => {
    const songId = parseInt(req.params.id);
    const songs = await Song.findAll({
        where: {
            id: songId,
        },
        include: [
            {
                model: Album,
                include: [
                    {
                        model: Artist 
                    }
                ]
            }]
    })

    const songsList = songs.map(song => {
      return { 
        songId: song.id, 
        songName: song.songName,
        albumName: song.Album.albumName, 
        albumId: song.Album.id,
        artistName: song.Album.Artist.artistName,
        artistId: song.Album.Artist.id
      }
    })

    res.json({ songsList });
})
);


module.exports = router