const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/User");
require("./services/passport");

// connect to mongoose and pass the provided URI
mongoose.connect(keys.mongoURI);

// thing
const app = express();

// app.use() adds middleware to express
// each incoming request passes through
// the middleware and those middlewares
// act on it in some manner
app.use(express.json());

// Tells express we are using cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey] // encryption key for cookie
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Call authRoutes from from index to connect the routes to the app object
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

// only runs in productions
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assests
  // like our main.js file or main.css
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// get port dynamically from environment variable or use 8080 by default
const PORT = process.env.PORT || 5000;

// instructs express to tell node to listen to incoming traffic on provided
// port
app.listen(PORT);

// Express methods: get (get info), post(update property),
// put (add new or update all properties), delete (remove),
// patch (update multiple properties)

// http://localhost:5000/auth/google/callback

// app is the express server
// .get() creates a new route handler
// "/"" is the route
// req  (request) - incoming request
// res (response) - the response that is being send back
// res.send - close request and send back response with json data
// app.get('/', (req, res) => {
// res.send({ hi: 'there' });
// });
