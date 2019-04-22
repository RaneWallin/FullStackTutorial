const mongoose = require('mongoose');
const { Schema } = mongoose;

// MongoDB does not require a schema, but mongoose does. Set the
// Scehema object here
const userSchema = new Schema({
    googleId: String,
});


// Tell mongodb to create a model named users
mongoose.model('users', userSchema);