const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../utils');
const { User } = require('../db/models');
const { Playlist } = require('../db/models');
const { Artist } = require('../db/models');
const { Album } = require('../db/models');
const { Song } = require('../db/models');

const router = express.Router();


//Validate email and password 
const validateEmailandPassword = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide an entry for field email'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an entry for field password')
];

//Post route for creating user
router.post('/', validateEmailandPassword, handleValidationErrors, asyncHandler( async( req, res) =>{
    const { email, password, nickName, birthday } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, hashedPassword, nickName, birthday});
    res.status(201).json({
        user: { id: user.id}
    })
}));

router.get('/', asyncHandler(async(req, res)=>{
    console.log('home route works');
    const users = await User.findAll();
    res.json({ users })
}))

module.exports = router;