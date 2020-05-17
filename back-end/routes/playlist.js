
const express = require('express');
const { check, validationResult } = require('express-validator');
const { Playlist } = require('../db/models');
const { User } = require('../db/models')
const { csrfProtection, asyncHandler } = require('../utils');

const router = express.Router();

const playlistValidators = 
    check('playlistName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an entry for playlist name')
        .isLength({ max: 20 })
        .withMessage('Playlist name cannot be more than 20 characters long.')


router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const playlistId = parseInt(req.params.id, 10);
    const playlist = await Playlist.findByPk(playlistId);
    res.json({playlist: playlist.playlistName})
}))


//Get route for playlist songs
router.get('')




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