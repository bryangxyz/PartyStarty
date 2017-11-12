const mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true
  },
  eventLocation: {
    type: String,
    required: true
  },
  eventTime: {
  	type: Date
  },
  eventDesc: {
    type: String
  },
  eventUsers: {
  	type: Array
  }
});

module.exports = mongoose.model('Event', EventSchema);
