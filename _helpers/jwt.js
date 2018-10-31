const expressJwt = require('express-jwt');
const userService = require('../users/user.service');

module.exports = {user, admin};

const secret = (process.env.secret || require('../config.json').secret);

function user() {
    return expressJwt({ secret, isRevoked: isRevokedUser });
}

function admin(){
    return expressJwt({ secret, isRevoked: isRevokedAdmin });
}

async function isRevokedUser(req, payload, done) {
    const user = await userService.getById(payload.id);
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};

async function isRevokedAdmin(req, payload, done) {
    const user = await userService.getById(payload.id);
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    else if(user.admin === false){
        return done(null, true);
    }

    done();
};