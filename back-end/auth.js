const jwt = require('jsonwebtoken');
const { jwtConfig } = require('./config'); //check this
const { User } = require('./db/models');
const bearerToken = require('express-bearer-token');
const { secret, expiresIn } = jwtConfig;

const getUserToken = (user) => {
    const userTokenData = {
        id: user.id,
        email: user.email
    };

    //Here we create the token
    const token = jwt.sign(
        { data: userTokenData },
        secret,
        {expiresIn: parseInt(expiresIn, 10)} // This will expire in 1 week
    );
    return token;
}

// const restoreUser = (req, res, next) => {
//     const { token } = req;
//     if(!token){
//         return res.set("WWW-Authenticate", "Bearer").status(401).end();
//     }
//     return jwt.verify(token, secret, null, async( err, jwtPayload) => {
//         if(err) {
//             err.status = 401;
//             return next(err);
//         }

//         const { id } = jwtPayload.data
//         try{
//             req.user = await User.findByPk(id);
//         } catch (e){
//             return next(e)
//         }

//         if(!req.user) {
//             return res.set("WWW-Authenticate", "Bearer").status(401).end();
//         }
//         return next();
//     })
// }

const requireAuth = [bearerToken()];
module.exports = { getUserToken, requireAuth};