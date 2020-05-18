const jwt = require('jsonwebtoken');
const { jwtConfig } = require('./config'); //check this
const { User } = require('./db/models');
const bearerToken = require('express-bearer-token');
const { secret, expiresIn } = jwtConfig;
