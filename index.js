const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// connect to mongoose and pass the provided URI
mongoose.connect(keys.mongoURI);

// thing
const app = express();

//


// Call authRoutes from from index to connect the routes to the app object


require('./routes/authRoutes')(app);


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