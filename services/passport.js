const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// Telling passport what strategy we want to use for authentication
// GoogleStrategy(configurationOptions, function)
passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log("access token",
                accessToken,
                "refresh token",
                refreshToken,
                "profile",
                profile);
        })
);
