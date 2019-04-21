const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

// app is the express server
// .get() creates a new route handler
// "/"" is the route
// req  (request) - incoming request
// res (response) - the response that is being send back
// res.send - close request and send back response with json data
// app.get('/', (req, res) => {
// res.send({ hi: 'there' });
// });

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
   
// when user goes to /auth/google route, forward them on to passport to 
// handle google authnetication
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// when user is redirected back to auth/google/callback use the returned
// token to authenticate the user via passport
app.get('/auth/google/callback', passport.authenticate('google'))

// get port dynamically from environment variable or use 8080 by default
const PORT = process.env.PORT || 5000;

// instructs express to tell node to listen to incoming traffic on provided
// port 
app.listen(PORT);


// Express methods: get (get info), post(update property), 
// put (add new or update all properties), delete (remove), 
// patch (update multiple properties)

// http://localhost:5000/auth/google/callback