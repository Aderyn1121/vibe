const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const {
  asyncHandler,
  csrfProtection,
  handleValidationErrors,
} = require('../utils');
const { requireAuth, getUserToken } = require('../auth');
const { User } = require('../db/models');
const { UserFriend } = require('../db/models');
const { Playlist } = require('../db/models');

const router = express.Router();

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

router.get(
  '/:id/friends',
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
