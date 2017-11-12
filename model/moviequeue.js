const mongoose = require('mongoose');

var MovieQueueSchema = new mongoose.Schema({
  title: String,
  id: Number,
  poster: String,
  overview: String,
  votes: Number,
  upvotes: Number,
  downvotes: Number,
  event: { type: String
    // required: true
  }
  
});

module.exports = mongoose.model('Movie', MovieQueueSchema);
