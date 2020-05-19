const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection, handleValidationErrors } = require('../utils');
const { requireAuth, getUserToken } = require('../auth')
const { User } = require('../db/models');
const { UserFriend } = require('../db/models');
const { Playlist } = require('../db/models');


const router = express.Router();

//Post route for creating user
const validateEmailAndPassword = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide an entry for field email.')
        .isLength({ max: 100})
        .withMessage('Email address must not be more than 100 characters long.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an entry for field password.')
];


router.post('/token', validateEmailAndPassword, asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where:{
            email,
        }
    });

    if(!user || !user.validatePassword(password)){
        const err = new Error('Login Failed');
        err.status = 404;
        err.title = 'Login failed';
        err.erros = ['The provided credentials were invalid'];
        return next(err);
    };

    const token = getUserToken(user);
    res.json({token, user: { id: user.id }})
}))

//Get route for users returns userName and userId
router.get('/', asyncHandler(async(req, res)=>{
    const users = await User.findAll();
    const userList = users.map( user => {
        return {userName: user.userName, userId: user.id}
    })
    res.json({userList})
    
}))

//Get route for user by id returns specific userName and userId
router.get('/:id(\\d+)', asyncHandler( async(req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    res.json({ username: user.userName,  userId: user.id })
}))

//Get route for user playlists
router.get('/:id/playlists', requireAuth, asyncHandler( async(req, res)=> {
    const userId = parseInt(req.params.id);
    const playlists = await Playlist.findAll({
        include: {
            model: User
        },
        through: {
            attributes: ['playlistName']
        },
        where: {
            userId: userId
        }
    });
    const playlistNames = playlists.map(playlist => {
        return { playList: playlist.playlistName, playlistId: playlist.id, userId: playlist.userId }
    });
    res.json({ playlistNames })
}))

router.get('/:id/friends', requireAuth, asyncHandler( async( req, res) => {
    const userId = parseInt(req.params.id, 10)
    const friends = await UserFriend.findAll({
        where:{
            userId,
        }
    })
    //Friend id is the friends userId from the Users model
    const friendsList = friends.map(user => {
        return {userName: user.userName, friend: user.friendName, userId: user.id, friendId:user.friendId}
    })
    res.json({friendsList})
}))


module.exports = router