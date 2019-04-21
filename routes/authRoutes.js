const passport = require('passport');

module.exports = (app) => {
// when user goes to /auth/google route, forward them on to passport to
// handle google authnetication
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

// when user is redirected back to auth/google/callback use the returned
// token to authenticate the user via passport
    app.get('/auth/google/callback', passport.authenticate('google'));
}