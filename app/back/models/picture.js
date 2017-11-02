// load the things we need
var mongoose = require('mongoose');

// define the schema for our venue model
var pictureSchema = mongoose.Schema({
    
    title: String,
    url: String,
    likes: Number,
    author: String,
    voters: [String]
    
});

// create the model for venues and expose it to our app
module.exports = mongoose.model('Picture', pictureSchema);
