const express = require('express');
const { check } = require('express-validator');
const {
  asyncHandler,
  csrfProtection,
  handleValidationErrors,
} = require('../utils');
const { requireAuth, getUserToken } = require('../auth');
const { User } = require('../db/models');
const { UserFriend } = require('../db/models');
const { Playlist } = require('../db/models');
const { PlaylistSong } = require('../db/models');

const router = express.Router();

const playlistValidators = check('playlistName')
  .exists({ checkFalsy: true })
  .withMessage('Please provide an entry for playlist name')
  .isLength({ max: 20 })
  .withMessage('Playlist name cannot be more than 20 characters long.');

router.get(
  '/:id(\\d+)/',
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    res.json({ username: user.userName, userId: user.id });
  })
);

// Get route for user playlists   /users/1/playlists/

router.get(
  '/:id/playlists',
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id);
    const playlists = await Playlist.findAll({
      include: {
        model: User,
      },
      through: {
        attributes: ['playlistName'],
      },
      where: {
        userId: userId,
      },
    });
    const playlistNames = playlists.map((playlist) => {
      return {
        playList: playlist.playlistName,
        playlistId: playlist.id,
        userId: playlist.userId,
      };
    });
    res.json({ playlistNames });
  })
);
router.get('/:id/library', asyncHandler( async(req, res) =>{
  const userId = parseInt(req.params.id, 10);
  const playlists = await Playlist.findAll({where: { userId} , include: { model: PlaylistSong }});

  // let playlistSongs;
  // for(let i = 0; i < playlists.length; i++){
  //   let playlistId = playlists[i].id;
  //   playlistSongs = await PlaylistSong.findAll({ where: {playlistId}})
  
  // }
  // let library = {};
  
  res.json({playlists})
}))

//Add Playlists
router.post('/:id/add-playlist', playlistValidators, handleValidationErrors, requireAuth, asyncHandler( async( req, res) => {
  const userId = parseInt(req.params.id, 10);
  console.log(userId)
  const { playlistName } = req.body;
  console.log(playlistName)
  const playlist = await Playlist.create({playlistName, userId });
  res.status(201).json({playlistId: playlist.id, playlist: playlist.playlistName });
}));

router.get(
  '/:id/friends',
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const friends = await UserFriend.findAll({
      where: {
        userId,
      },
    });
    //Friend id is the friends userId from the Users model
    const friendsList = friends.map((user) => {
      return {
        userName: user.userName,
        friend: user.friendName,
        userId: user.id,
        friendId: user.friendId,
      };
    });
    res.json({ friendsList });
  })
);

module.exports = router;
