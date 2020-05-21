const jwt = require("jsonwebtoken");
const { jwtConfig } = require("./config");
const { User } = require("./db/models");
const bearerToken = require("express-bearer-token");

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
    console.log('token')
    return token;
}


const restoreUser = (req, res, next) => {
    const { token } = req;
    console.log(token)
    if(!token){
        return res.set("WWW-Authenticate", "Bearer").status(401).end();
    }
    return jwt.verify(token, secret, null, async( err, jwtPayload) => {
        if(err) {
            err.status = 401;
            return next(err);
        }

        const { id } = jwtPayload.data
        console.log(jwtPayload.data)
        console.log('This is the ID:', id)
        try{
            req.user = await User.findByPk(2);
            console.log(req.user)
        } catch (e){
            return next(e)
        }

        if(!req.user) {
            console.log('here')
            return res.set("WWW-Authenticate", "Bearer").status(401).end();
        }
        return next();
    })
}

const requireAuth = [bearerToken(), restoreUser];
module.exports = { 
    getUserToken, 
    requireAuth
};
