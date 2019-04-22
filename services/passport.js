const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// get the users model from mongoose
const User = mongoose.model("users");

// Telling passport what strategy we want to use for authentication
// GoogleStrategy(configurationOptions, function)
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (!existingUser) {
          new User({ googleId: profile.id })
            .save()
            .then(newUser => done(null, newUser));
        } else {
          done(null, existingUser);
        }
      });
    }
  )
);
