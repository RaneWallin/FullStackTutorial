const passport = require("passport");

module.exports = app => {
  // when user goes to /auth/google route, forward them on to passport to
  // handle google authnetication
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // when user is redirected back to auth/google/callback use the returned
  // token to authenticate the user via passport
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  // log out a user
  app.get("/api/logout", (req, res) => {
    // provided by passport. Invalidates the cookie to log the user out
    req.logout();
    res.redirect("/");
  });

  // test
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
