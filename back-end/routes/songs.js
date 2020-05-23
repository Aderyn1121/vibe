const express = require('express');
const { Song } = require('../db/models');
const { asyncHandler } = require('../utils');
const { requireAuth } = require('../auth')
const router = express.Router();


router.get('/:id', requireAuth, asyncHandler(async (req, res) => {
    const songId = parseInt(req.params.id);
    const song = await Song.findByPk(songId);
    res.json({name: song.songName, id: song.id});
}))

module.exports = router