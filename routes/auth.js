const express = require('express');
const router = express.Router();
const passportGoogle = require('../auth/google');

router.get('/google', //Login with Google+
    passportGoogle.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/google/callback',
    passportGoogle.authenticate('google', {
        successRedirect: '/chat',
        failureRedirect: '/'
    }));

module.exports = router