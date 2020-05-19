const express = require('express');
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection, handleValidationErrors } = require('../utils');
const { logoutUser, loginUser, getUserToken, requireAuth } = require('../auth');
const { User } = require('../db/models');

const router = express.Router();


//Validate user for sign-up
const validateUser = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide an entry for field email.')
        .isLength({ max: 100})
        .withMessage('Email address must not be more than 100 characters long.'),
    check('userName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an entry for field user name'),
    check('birthday')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an entry for field birthday')
        .custom((value) => {
            return User.findOne({ where: { email: value } })
              .then((user) => {
                if (user) {
                  return Promise.reject('The provided Email Address is already in use by another account');
                }
              });
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Confirm Password')
]

//Validate email and password for login
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


//Post route for creating a new user
router.post('/sign-up', validateUser, handleValidationErrors , asyncHandler( async( req, res) =>{
    const { email, password, userName, birthday } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, hashedPassword, userName, birthday});
    const token = getUserToken(user)
    res.status(201).json({
        user: { id: user.id},
        token,
    })
}));

//Post route for loging in user 
router.post('/login', validateEmailAndPassword, handleValidationErrors, requireAuth, asyncHandler( async(req, res) =>{
    const { email, password } = req.body;
    console.log('EMAIL:', email)
    const user = await User.findOne({ where: { email }});

    if(!user || !user.validatePassword(password)){
        const err = new Error('Login Failed');
        err.status = 404;
        err.title = 'Login failed';
        err.erros = ['The provided login information was invalid'];
        return next(err);
    };

    const token = getUserToken(user);
    res.json({token, user: { id: user.id }})
}))

// //Post route for loging out user
// router.post('/log-out', (req, res) => {
//     logoutUser(req, res);
// })

module.exports = router;