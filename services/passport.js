const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// get the users model from mongoose
const User = mongoose.model("users");

// called with user that is returned from the done() callback in GoogleStrategy
passport.serializeUser((user, done) => {
  // user is the model returned from MongoDB
  // user.id is the id assigned to the rcd ecord by MongoDB
  // using mongo ID because if we use multiple
  // authentication strategies there may be different
  // profile IDs, but the Mondo ID will stay the same
  done(null, user.id);
});

// take id and turn it into a mongoose model user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Telling passport what strategy we want to use for authentication
// GoogleStrategy(configurationOptions, function)
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) return done(null, existingUser);

        const newUser = await new User({ googleId: profile.id }).save();
        done(null, newUser);
      } catch (err) {
        console.log(err);
      }
    }
  )
);
