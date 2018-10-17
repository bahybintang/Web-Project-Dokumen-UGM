const expressJwt = require('express-jwt');
const config = require('../config.json');
const userService = require('../users/user.service');

module.exports = {user, admin};

// function jwt() {
//     const secret = config.secret;
//     return expressJwt({ secret, isRevoked }).unless({
//         path: [
//             // public routes that don't require authentication
//             '/users/authenticate',
//             '/users/register',
//             '/api/add',
//             /^\/api\/update.*/,
//             /^\/api\/delete.*/,
//             /^\/api\/search.*/,
//             /^\/api\/get.*/,
//             /^\/api\/page.*/
//         ]
//     });
// }

function user() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked: isRevokedUser });
}

function admin(){
    const secret = config.secret;
    return expressJwt({ secret, isRevoked: isRevokedAdmin });
}

async function isRevokedUser(req, payload, done) {
    const user = await userService.getById(payload.sub);
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};

async function isRevokedAdmin(req, payload, done) {
    const user = await userService.getById(payload.sub);
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    else if(user.admin === false){
        return done(null, true);
    }

    done();
};