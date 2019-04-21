const express = require('express');
const app = express();

// app is the express server
// .get() creates a new route handler
// "/"" is the route
// req  (request) - incoming request
// res (response) - the response that is being send back
// res.send - close request and send back response with json data
app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

// get port dynamically from environment variable or use 8080 by default
const PORT = process.env.PORT || 8080;

// instructs express to tell node to listen to incoming traffic on provided
// port 
app.listen(PORT);


// Express methods: get (get info), post(update property), 
// put (add new or update all properties), delete (remove), 
// patch (update multiple properties)