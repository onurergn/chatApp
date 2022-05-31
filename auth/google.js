const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//models
const User = require('../models/users');

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_LOGIN_CLIENT_ID,
        clientSecret: process.env.GOOGLE_LOGIN_SECRET_ID,
        callbackURL: process.env.GOOGLE_LOGIN_CALLBACK_URL,
    }, (accesToken, refreshToken, profile, done) => {
        const data = profile._json;
        User.findOrCreate({ 'googleId': data.sub }, { 'name': data.given_name, 'surname': data.family_name, 'profilePhotoUrl': data.picture },
            (err, user) => {
                return done(err, user)
            })
    }));

passport.serializeUser((user, done) => {
    // console.log(`\n--------> Serialize User:`)
    // console.log(user)
    done(null, user)
});

passport.deserializeUser((user, done) => {
    // console.log("\n--------- Deserialized User:")
    // console.log(user)
    done(null, user)
});

module.exports = passport;