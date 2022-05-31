const cookieParser = require('cookie-parser');
const passportSocketIo = require('passport.socketio');
const redisStore = require('../helpers/redisStore');

module.exports = passportSocketIo.authorize({
    cookieParser,
    key: 'connect.sid',
    secret: process.env.SESSION_SECRET_KEY,
    store: redisStore,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
});

function onAuthorizeSuccess(data, accept) {
    console.log('successful connection to socket.io');

    // The accept-callback still allows us to decide whether to
    // accept the connection or not.
    accept(null, true);
}

function onAuthorizeFail(data, message, error, accept) {
    if (error)
        throw new Error(message);
    console.log('failed connection to socket.io:', message);

    // We use this callback to log all of our failed connections.
    accept(null, false);
}